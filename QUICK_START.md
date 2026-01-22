# Quick Start Guide - CyberEd Range

Get started with the CyberEd Range platform in just a few minutes!

## Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Setup Steps

1. **Navigate to the project directory**
   ```bash
   cd cyber-range-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - Or manually navigate to that URL

## First Time Using the Platform

### For Students

1. **Explore the Dashboard**
   - See the 5 challenge categories
   - Check your stats (all zeros at first!)
   - Read the welcome message

2. **Visit the Vocabulary Page**
   - Click "📚 Vocabulary" in the header
   - Browse 26+ cybersecurity terms
   - Filter by category

3. **Start Your First Challenge**
   - Return to Dashboard
   - Click on "🔐 Cryptography" category
   - Select "Caesar Cipher Basics" (Easy, 10pts)
   - Read the description and learning objective
   - Try to solve it!

4. **Use the Features**
   - Click vocabulary terms to see definitions
   - Use "Show Hints" if you need help
   - Submit your answer
   - Read the explanation

### For Instructors

1. **Review All Challenges**
   - Complete each challenge yourself first
   - Understand the learning objectives
   - Note the difficulty progression

2. **Read the Documentation**
   - `README.md` - Platform overview
   - `INSTRUCTOR_GUIDE.md` - Teaching strategies and answer key
   - `STUDENT_GUIDE.md` - Student resources

3. **Plan Your Curriculum**
   - Decide: full course, mini-unit, or club?
   - Set completion requirements
   - Create grading rubric
   - Plan supplementary activities

4. **Prepare Students**
   - Discuss ethical hacking
   - Set expectations
   - Review acceptable use
   - Demonstrate the platform

## Platform Navigation

### Main Navigation (Header)
- **🏠 Dashboard** - Home page with categories and stats
- **📚 Vocabulary** - Glossary of all terms
- **🔄 Reset Progress** - Clear all progress (use carefully!)

### Dashboard Features
- **Welcome Section** - Introduction and overview
- **Stats Cards** - Challenges completed, total challenges, points, progress %
- **Category Cards** - 5 challenge categories to explore
- **Learning Objectives** - What you'll learn

### Challenge Flow
```
Dashboard → Category → Challenge List → Challenge Detail → Back to List
```

## Challenge Categories Overview

### 🔐 Cryptography (5 challenges, 80 points)
**Difficulty:** Easy to Medium
**Start here if you like:** Codes, puzzles, math

**Challenges:**
1. Caesar Cipher Basics (Easy, 10pts)
2. Base64 Encoding (Easy, 15pts)
3. Hex Decoder (Easy, 15pts)
4. ROT13 Message (Medium, 20pts)
5. Hash Detective (Medium, 25pts)

### 🌐 Network Security (4 challenges, 85 points)
**Difficulty:** Easy to Hard
**Start here if you like:** How the internet works

**Challenges:**
1. Common Ports (Easy, 10pts)
2. IP Address Classes (Medium, 20pts)
3. Protocol Detective (Medium, 25pts)
4. Firewall Rules (Hard, 30pts)

### 🔑 Password Security (4 challenges, 80 points)
**Difficulty:** Easy to Hard
**Start here if you like:** Security awareness, personal safety

**Challenges:**
1. Password Strength 101 (Easy, 10pts)
2. Brute Force Math (Medium, 20pts)
3. Common Password Patterns (Medium, 20pts)
4. Password Hashing (Hard, 30pts)

### 🌍 Web Security (4 challenges, 75 points)
**Difficulty:** Easy to Medium
**Start here if you like:** Websites, web development

**Challenges:**
1. URL Analysis (Easy, 10pts)
2. HTTPS vs HTTP (Easy, 15pts)
3. SQL Injection Basics (Medium, 25pts)
4. XSS Detection (Medium, 25pts)

### 🎭 Social Engineering (4 challenges, 75 points)
**Difficulty:** Easy to Hard
**Start here if you like:** Psychology, people skills

**Challenges:**
1. Phishing Email Detection (Easy, 10pts)
2. Pretexting Scenario (Medium, 20pts)
3. Tailgating Attack (Medium, 20pts)
4. USB Baiting (Hard, 25pts)

## Tips for Success

### Learning Strategy
1. **Start with Easy challenges** across all categories
2. **Read every explanation** even if you got it right
3. **Learn the vocabulary** - it's the foundation
4. **Progress at your own pace** - quality over speed
5. **Discuss with others** - collaboration enhances learning

### If You Get Stuck
1. Re-read the challenge carefully
2. Click on vocabulary terms for definitions
3. Use the hints (no penalty!)
4. Take a break and come back fresh
5. Ask your instructor or classmates for guidance (not answers!)

### Answer Formats
- Most challenges accept flexible formats
- Capitalization usually doesn't matter
- Flags can be entered with or without `FLAG{}`
- Follow the format shown in the challenge if specified

## Technical Details

### Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

### Data Storage
- Progress is saved automatically in your browser's localStorage
- Data persists between sessions
- Clearing browser data will reset progress
- Each browser has separate progress

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist/` directory.

## Troubleshooting

### Common Issues

**"npm install" fails**
- Ensure Node.js version 16+ is installed
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

**Port 3000 already in use**
- Close other applications using port 3000
- Or the app will automatically use a different port (check the terminal output)

**Progress not saving**
- Ensure cookies/localStorage are enabled in your browser
- Check if you're in private/incognito mode (may not persist)

**Page not loading**
- Check browser console for errors (F12)
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache

**Vocabulary terms not showing**
- Refresh the page
- Check browser console for JavaScript errors

## Keyboard Shortcuts

- **Enter** - Submit answer (when in input field)
- **Esc** - No shortcuts currently, but UI is mouse/touch friendly

## Mobile Access

The platform is responsive and works on tablets and phones, though desktop is recommended for the best experience.

## Getting Help

### For Students
- Ask your instructor
- Review the `STUDENT_GUIDE.md`
- Discuss with classmates
- Use the hints system

### For Instructors
- Review the `INSTRUCTOR_GUIDE.md`
- Check the answer key (in Instructor Guide)
- Explore all challenges yourself first
- Reach out to IT support if needed

## Next Steps

### After Quick Start

1. **Students**: Complete at least one challenge from each category
2. **Instructors**: Plan your first lesson using the platform
3. **Everyone**: Explore the vocabulary page to build foundational knowledge

### Additional Resources

See the main `README.md` for:
- Detailed feature list
- Educational standards alignment
- Learning outcomes
- Technology stack

See `INSTRUCTOR_GUIDE.md` for:
- Curriculum integration ideas
- Assessment strategies
- Answer key
- Extension activities

See `STUDENT_GUIDE.md` for:
- Detailed challenge tips
- Study strategies
- Career information
- Ethical guidelines

## Support

For technical issues or questions:
1. Check this Quick Start guide
2. Review the README.md
3. Contact your instructor
4. Check browser console for errors

---

**Ready to start?** Run `npm run dev` and open your browser to begin your cybersecurity journey!

🔒 **Happy (Ethical) Hacking!** 🔒
