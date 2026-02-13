import { useState, useEffect } from 'react';
import { subscribeToClassProgress, getTeacherInfoForClass, getShopItems } from '../services/firebaseService';
import PixelAvatar from './PixelAvatar';
import TeamChat from './TeamChat';

const ClassSidebar = ({
  classCode,
  isOpen,
  onToggle,
  currentUserId,
  currentUserRole,
  currentUser,
  clothingItemsMap: externalClothingMap,
  onSelectStudent
}) => {
  const [students, setStudents] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [clothingItemsMap, setClothingItemsMap] = useState(externalClothingMap || {});
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (!classCode) return;

    const unsubscribe = subscribeToClassProgress(classCode, (studentData) => {
      setStudents(studentData);
    });

    const loadTeacher = async () => {
      const info = await getTeacherInfoForClass(classCode);
      if (info) setTeacherInfo(info);
    };
    loadTeacher();

    // Load shop items for avatar rendering if not provided externally
    if (!externalClothingMap || Object.keys(externalClothingMap).length === 0) {
      const loadItems = async () => {
        const items = await getShopItems(classCode);
        const map = {};
        items.forEach(item => { map[item.id] = item; });
        setClothingItemsMap(map);
      };
      loadItems();
    }

    return () => unsubscribe();
  }, [classCode, externalClothingMap]);

  // Update clothing map when external prop changes
  useEffect(() => {
    if (externalClothingMap && Object.keys(externalClothingMap).length > 0) {
      setClothingItemsMap(externalClothingMap);
    }
  }, [externalClothingMap]);

  const getOnlineStatus = (lastActivity) => {
    if (!lastActivity) return 'offline';
    const now = new Date();
    const diff = now - lastActivity;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 5) return 'online';
    if (minutes < 30) return 'away';
    return 'offline';
  };

  const sortedStudents = [...students].sort((a, b) => {
    const statusOrder = { online: 0, away: 1, offline: 2 };
    const aStatus = getOnlineStatus(a.lastActivity);
    const bStatus = getOnlineStatus(b.lastActivity);
    if (statusOrder[aStatus] !== statusOrder[bStatus]) {
      return statusOrder[aStatus] - statusOrder[bStatus];
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <button
        className={`class-sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
        title={isOpen ? 'Close sidebar' : 'Open class sidebar'}
      >
        {isOpen ? '\u25C0' : '\u25B6'}
      </button>

      <div className={`class-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="class-sidebar-header">
          <h3>Class Members</h3>
        </div>

        {!showChat ? (
          <div className="class-sidebar-content">
            {/* Teacher section */}
            {teacherInfo && (
              <div className="class-sidebar-teacher">
                <div className="sidebar-teacher-row">
                  <PixelAvatar avatarConfig={teacherInfo.avatarConfig} size={48} clothingItems={clothingItemsMap} />
                  <div className="sidebar-teacher-info">
                    <span className="sidebar-teacher-name">{teacherInfo.name}</span>
                    <span className="sidebar-teacher-badge">Teacher</span>
                  </div>
                </div>
              </div>
            )}

            {/* Student list */}
            <div className="class-sidebar-students">
              {sortedStudents.map(student => {
                const status = getOnlineStatus(student.lastActivity);
                return (
                  <div
                    key={student.id}
                    className="sidebar-student-row"
                    onClick={() => onSelectStudent?.(student)}
                    style={{ cursor: onSelectStudent ? 'pointer' : 'default' }}
                  >
                    <PixelAvatar
                      avatarConfig={student.avatarConfig}
                      size={32}
                      clothingItems={clothingItemsMap}
                    />
                    <span className="sidebar-student-name">{student.name}</span>
                    <span className={`sidebar-online-dot ${status}`} title={status} />
                  </div>
                );
              })}
              {students.length === 0 && (
                <div className="sidebar-empty">No students yet</div>
              )}
            </div>
          </div>
        ) : (
          <div className="class-sidebar-chat">
            <TeamChat
              classCode={classCode}
              currentUser={currentUser}
              clothingItemsMap={clothingItemsMap}
            />
          </div>
        )}

        {/* Chat toggle for students only */}
        {currentUserRole === 'student' && (
          <div className="class-sidebar-footer">
            <button
              className={`sidebar-chat-toggle ${showChat ? 'active' : ''}`}
              onClick={() => setShowChat(c => !c)}
            >
              {showChat ? 'Members' : 'Team Chat'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ClassSidebar;
