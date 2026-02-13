import { useState, useEffect } from 'react';
import {
  subscribeToShopItems,
  subscribeToStudentPurchases,
  createPurchaseRequest,
  seedDefaultShopItems
} from '../services/firebaseService';

const RewardShop = ({ currentUser, totalPoints, spentPoints, onBack }) => {
  const [shopItems, setShopItems] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmItem, setConfirmItem] = useState(null);
  const [purchasing, setPurchasing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [shopTab, setShopTab] = useState('rewards');

  const availableBalance = totalPoints - spentPoints;

  useEffect(() => {
    if (!currentUser?.classCode) return;

    // Seed defaults on first load
    seedDefaultShopItems(currentUser.classCode);

    const unsubItems = subscribeToShopItems(currentUser.classCode, (items) => {
      setShopItems(items.filter(item => item.isActive));
      setLoading(false);
    });

    const unsubPurchases = subscribeToStudentPurchases(
      currentUser.classCode,
      currentUser.id,
      (purchaseData) => {
        setPurchases(purchaseData);
      }
    );

    return () => {
      unsubItems();
      unsubPurchases();
    };
  }, [currentUser]);

  const handlePurchase = async () => {
    if (!confirmItem || purchasing) return;
    setPurchasing(true);

    try {
      await createPurchaseRequest(currentUser.classCode, {
        studentId: currentUser.id,
        studentName: currentUser.name,
        itemId: confirmItem.id,
        itemName: confirmItem.name,
        itemCost: confirmItem.cost
      });
      setConfirmItem(null);
    } catch (err) {
      console.error('Error creating purchase request:', err);
    } finally {
      setPurchasing(false);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleString(undefined, {
      month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit'
    });
  };

  const pendingCount = purchases.filter(p => p.status === 'pending').length;

  if (loading) {
    return (
      <div className="reward-shop">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading shop...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reward-shop">
      <button className="back-btn" onClick={onBack}>Back to Dashboard</button>

      <div className="shop-header">
        <h1>Reward Shop</h1>
        <div className="shop-balance">
          <span className="balance-label">Available Balance</span>
          <span className="balance-value">{availableBalance} pts</span>
          <span className="balance-detail">({totalPoints} earned - {spentPoints} spent)</span>
        </div>
      </div>

      {pendingCount > 0 && (
        <div className="shop-pending-notice">
          You have {pendingCount} pending purchase{pendingCount !== 1 ? 's' : ''} awaiting teacher approval.
        </div>
      )}

      <div className="shop-tabs">
        <button
          className={`shop-tab ${shopTab === 'rewards' ? 'active' : ''}`}
          onClick={() => setShopTab('rewards')}
        >
          Rewards
        </button>
        <button
          className={`shop-tab ${shopTab === 'clothing' ? 'active' : ''}`}
          onClick={() => setShopTab('clothing')}
        >
          Clothing
        </button>
      </div>

      <div className="shop-grid">
        {shopItems
          .filter(item => shopTab === 'clothing' ? !!item.clothingType : !item.clothingType)
          .map(item => {
            const canAfford = availableBalance >= item.cost;
            return (
              <div key={item.id} className={`shop-item-card ${!canAfford ? 'unaffordable' : ''}`}>
                <div className="shop-item-icon">{item.icon}</div>
                <div className="shop-item-name">{item.name}</div>
                {item.clothingType && (
                  <span className="clothing-type-badge">{item.clothingType}</span>
                )}
                {item.description && <div className="shop-item-desc">{item.description}</div>}
                <div className="shop-item-cost">{item.cost} pts</div>
                <button
                  className="purchase-btn"
                  disabled={!canAfford}
                  onClick={() => setConfirmItem(item)}
                >
                  {canAfford ? 'Purchase' : 'Not Enough Points'}
                </button>
              </div>
            );
          })}
        {shopItems.filter(item => shopTab === 'clothing' ? !!item.clothingType : !item.clothingType).length === 0 && (
          <div className="shop-empty">
            {shopTab === 'clothing' ? 'No clothing items available yet.' : 'No reward items available yet. Check back later!'}
          </div>
        )}
      </div>

      <div className="purchase-history-section">
        <button
          className="toggle-history-btn"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? 'Hide' : 'Show'} My Purchases ({purchases.length})
        </button>

        {showHistory && (
          <div className="purchase-history">
            {purchases.length === 0 ? (
              <p className="history-empty">No purchases yet.</p>
            ) : (
              purchases.map(p => (
                <div key={p.id} className={`purchase-history-item status-${p.status}`}>
                  <div className="purchase-history-info">
                    <span className="purchase-item-name">{p.itemName}</span>
                    <span className="purchase-item-cost">{p.itemCost} pts</span>
                  </div>
                  <div className="purchase-history-meta">
                    <span className={`purchase-status-badge ${p.status}`}>{p.status}</span>
                    <span className="purchase-date">{formatTime(p.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {confirmItem && (
        <div className="modal-overlay" onClick={() => setConfirmItem(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Confirm Purchase</h3>
            <div className="confirm-item-preview">
              <span className="confirm-icon">{confirmItem.icon}</span>
              <span className="confirm-name">{confirmItem.name}</span>
              <span className="confirm-cost">{confirmItem.cost} pts</span>
            </div>
            <p className="confirm-note">
              Your purchase will be sent to the teacher for approval. Points will be deducted after approval.
            </p>
            <div className="confirm-actions">
              <button
                className="confirm-btn approve"
                onClick={handlePurchase}
                disabled={purchasing}
              >
                {purchasing ? 'Submitting...' : 'Confirm Purchase'}
              </button>
              <button
                className="confirm-btn cancel"
                onClick={() => setConfirmItem(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardShop;
