import { useState, useEffect } from 'react';
import {
  subscribeToShopItems,
  subscribeToPurchases,
  addShopItem,
  updateShopItem,
  deleteShopItem,
  approvePurchase,
  denyPurchase,
  seedDefaultShopItems
} from '../../services/firebaseService';

const ShopManager = ({ classCode }) => {
  const [shopItems, setShopItems] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', cost: '', icon: '', isActive: true, clothingType: '', clothingColor: '#CC3333', clothingStyle: '' });

  useEffect(() => {
    seedDefaultShopItems(classCode);

    const unsubItems = subscribeToShopItems(classCode, (items) => {
      setShopItems(items);
      setLoading(false);
    });

    const unsubPurchases = subscribeToPurchases(classCode, (purchaseData) => {
      setPurchases(purchaseData);
    });

    return () => {
      unsubItems();
      unsubPurchases();
    };
  }, [classCode]);

  const handleApprove = async (purchaseId) => {
    try {
      await approvePurchase(classCode, purchaseId, 'teacher');
    } catch (err) {
      console.error('Error approving purchase:', err);
    }
  };

  const handleDeny = async (purchaseId) => {
    try {
      await denyPurchase(classCode, purchaseId, 'teacher');
    } catch (err) {
      console.error('Error denying purchase:', err);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', cost: '', icon: '', isActive: true, clothingType: '', clothingColor: '#CC3333', clothingStyle: '' });
    setShowAddForm(false);
    setEditingItem(null);
  };

  const CLOTHING_STYLE_OPTIONS = {
    top: ['tshirt', 'hoodie', 'jacket', 'vest', 'cyberjacket'],
    bottom: ['jeans', 'shorts', 'khakis', 'cargopants'],
    shoes: ['sneakers', 'boots', 'cyberboots'],
    hat: ['cap', 'beanie', 'cybervisor'],
    face: ['sunglasses', 'cybervisor_face', 'piercings', 'mask'],
    cyborg: ['cyber_arm', 'cyber_eye', 'cyber_jaw'],
  };

  const handleSubmitItem = async (e) => {
    e.preventDefault();
    const itemData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      cost: parseInt(formData.cost, 10),
      icon: formData.icon.trim() || '🎁',
      isActive: formData.isActive
    };

    // Add clothing fields if a clothing type is selected
    if (formData.clothingType) {
      itemData.clothingType = formData.clothingType;
      itemData.clothingColor = formData.clothingColor || '#CC3333';
      itemData.clothingStyle = formData.clothingStyle || (CLOTHING_STYLE_OPTIONS[formData.clothingType]?.[0] || '');
    } else {
      itemData.clothingType = null;
      itemData.clothingColor = null;
      itemData.clothingStyle = null;
    }

    if (!itemData.name || !itemData.cost || itemData.cost <= 0) return;

    try {
      if (editingItem) {
        await updateShopItem(classCode, editingItem.id, itemData);
      } else {
        await addShopItem(classCode, itemData);
      }
      resetForm();
    } catch (err) {
      console.error('Error saving shop item:', err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      cost: item.cost.toString(),
      icon: item.icon || '',
      isActive: item.isActive !== false,
      clothingType: item.clothingType || '',
      clothingColor: item.clothingColor || '#CC3333',
      clothingStyle: item.clothingStyle || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Delete this shop item?')) return;
    try {
      await deleteShopItem(classCode, itemId);
    } catch (err) {
      console.error('Error deleting shop item:', err);
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await updateShopItem(classCode, item.id, { isActive: !item.isActive });
    } catch (err) {
      console.error('Error toggling item:', err);
    }
  };

  const filteredPurchases = purchases.filter(p => {
    if (filter === 'pending') return p.status === 'pending';
    if (filter === 'approved') return p.status === 'approved';
    if (filter === 'denied') return p.status === 'denied';
    return true;
  });

  const pendingCount = purchases.filter(p => p.status === 'pending').length;

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleString(undefined, {
      month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="shop-manager">
        <div className="sv-header"><h2>Reward Shop Manager</h2></div>
        <p className="sv-subtitle">Loading...</p>
      </div>
    );
  }

  return (
    <div className="shop-manager">
      {/* Purchase Requests Section */}
      <div className="sv-header">
        <h2>Purchase Requests</h2>
        <p className="sv-subtitle">
          {pendingCount > 0
            ? `${pendingCount} pending request${pendingCount !== 1 ? 's' : ''}`
            : 'No pending requests'}
        </p>
      </div>

      <div className="sv-filters">
        <div className="sv-filter-group">
          <label>Status:</label>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
          </select>
        </div>
      </div>

      {filteredPurchases.length === 0 ? (
        <div className="sv-empty">
          <div className="sv-empty-icon">
            {filter === 'pending' ? 'No pending purchase requests' : 'No purchase requests found'}
          </div>
        </div>
      ) : (
        <div className="sv-list">
          {filteredPurchases.map(purchase => (
            <div
              key={purchase.id}
              className={`sv-submission-card ${purchase.status === 'pending' ? 'hr-pending' : purchase.status === 'approved' ? 'hr-resolved' : ''}`}
            >
              <div className="sv-submission-header">
                <div className="sv-submission-info">
                  <span className="sv-student-name">{purchase.studentName}</span>
                  <span className="sv-type-badge">{purchase.itemName}</span>
                  <span className="sv-type-badge">{purchase.itemCost} pts</span>
                  <span className={`sv-status-badge ${purchase.status === 'approved' ? 'correct' : purchase.status === 'denied' ? 'incorrect' : ''}`}>
                    {purchase.status}
                  </span>
                </div>
                <div className="sv-submission-meta">
                  <span className="sv-date">{formatTime(purchase.createdAt)}</span>
                </div>
              </div>
              {purchase.status === 'pending' && (
                <div className="hr-actions">
                  <button className="hr-resolve-btn" onClick={() => handleApprove(purchase.id)}>
                    Approve
                  </button>
                  <button className="hr-resolve-btn deny-btn" onClick={() => handleDeny(purchase.id)}>
                    Deny
                  </button>
                </div>
              )}
              {purchase.resolvedAt && (
                <div className="hr-resolved-info">
                  {purchase.status === 'approved' ? 'Approved' : 'Denied'} {formatTime(purchase.resolvedAt)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Manage Items Section */}
      <div className="sv-header" style={{ marginTop: '2rem' }}>
        <h2>Manage Shop Items</h2>
        <button className="sm-add-btn" onClick={() => { resetForm(); setShowAddForm(!showAddForm); }}>
          {showAddForm ? 'Cancel' : '+ Add Item'}
        </button>
      </div>

      {showAddForm && (
        <form className="shop-item-form" onSubmit={handleSubmitItem}>
          <div className="sif-row">
            <label>Icon (emoji)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={e => setFormData({ ...formData, icon: e.target.value })}
              placeholder="🎁"
              maxLength={4}
              className="sif-icon-input"
            />
          </div>
          <div className="sif-row">
            <label>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Item name"
              required
            />
          </div>
          <div className="sif-row">
            <label>Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional description"
            />
          </div>
          <div className="sif-row">
            <label>Cost (points) *</label>
            <input
              type="number"
              value={formData.cost}
              onChange={e => setFormData({ ...formData, cost: e.target.value })}
              placeholder="50"
              min="1"
              required
            />
          </div>
          <div className="sif-row">
            <label>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
              />
              {' '}Active (visible to students)
            </label>
          </div>
          <div className="sif-row">
            <label>Clothing Type</label>
            <select
              value={formData.clothingType}
              onChange={e => setFormData({ ...formData, clothingType: e.target.value, clothingStyle: CLOTHING_STYLE_OPTIONS[e.target.value]?.[0] || '' })}
              style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.3)', color: '#e0e0e0', border: '1px solid rgba(0,255,255,0.3)', borderRadius: '6px', fontFamily: 'inherit' }}
            >
              <option value="">None (Regular Reward)</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="shoes">Shoes</option>
              <option value="hat">Hat</option>
              <option value="face">Face</option>
              <option value="cyborg">Cyborg</option>
            </select>
          </div>
          {formData.clothingType && (
            <>
              <div className="sif-row">
                <label>Clothing Color</label>
                <input
                  type="color"
                  value={formData.clothingColor}
                  onChange={e => setFormData({ ...formData, clothingColor: e.target.value })}
                  style={{ width: '60px', height: '32px', border: 'none', cursor: 'pointer' }}
                />
              </div>
              <div className="sif-row">
                <label>Clothing Style</label>
                <select
                  value={formData.clothingStyle}
                  onChange={e => setFormData({ ...formData, clothingStyle: e.target.value })}
                  style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.3)', color: '#e0e0e0', border: '1px solid rgba(0,255,255,0.3)', borderRadius: '6px', fontFamily: 'inherit' }}
                >
                  {(CLOTHING_STYLE_OPTIONS[formData.clothingType] || []).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          <button type="submit" className="sif-submit">
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </form>
      )}

      <div className="sm-items-list">
        {shopItems.map(item => (
          <div key={item.id} className={`sm-item-card ${!item.isActive ? 'sm-inactive' : ''}`}>
            <div className="sm-item-icon">{item.icon || '🎁'}</div>
            <div className="sm-item-details">
              <div className="sm-item-name">
                {item.name}
                {item.clothingType && <span className="clothing-type-badge">{item.clothingType}</span>}
              </div>
              <div className="sm-item-cost">{item.cost} pts</div>
              {item.description && <div className="sm-item-desc">{item.description}</div>}
            </div>
            <div className="sm-item-actions">
              <button className="sm-action-btn" onClick={() => handleToggleActive(item)} title={item.isActive ? 'Deactivate' : 'Activate'}>
                {item.isActive ? 'Hide' : 'Show'}
              </button>
              <button className="sm-action-btn" onClick={() => handleEdit(item)}>Edit</button>
              <button className="sm-action-btn sm-delete" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
        {shopItems.length === 0 && (
          <div className="sv-empty">
            <div className="sv-empty-icon">No shop items yet. Add one above!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopManager;
