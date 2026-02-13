# PyLens

A Python code tracing and debugging practice app. Test your understanding of Python by predicting outputs (Trace mode) or identifying bugs (Debug mode).

## Features

- **Two practice modes**: Trace (predict output) and Debug (find bugs)
- **8 tiers of difficulty**: Progressively unlock harder challenges
- **25 challenges per tier** across multiple Python concepts
- **Real-time feedback**: Score, streaks, and concept mastery tracking
- **Cloud sync**: Sign in with GitHub to sync progress across devices
- **Offline support**: Progress saved locally, syncs when online
- **Tag-based learning**: Track mastery by Python concept (loops, lists, strings, etc.)

## Usage

### Local Development

```bash
python3 -m http.server 8001 -d docs
# Open http://localhost:8001
```

No build step required. Static site served from `docs/` directory.

## Practice Modes

### Trace Mode
1. Read Python code
2. Choose the correct output from 4 options
3. Get instant feedback and explanations

### Debug Mode
1. Read Python code with a bug
2. Click the buggy line
3. Choose the bug description from 4 options
4. Get instant feedback with fixed code and explanations

## Progression System

- **Tier 1** unlocked by default
- **Tiers 2-8** unlock when you complete 10+ challenges in the previous tier
- Complete challenges in both Trace and Debug modes to unlock faster

## Cloud Sync & Security

### Firebase Configuration

The Firebase config in `docs/js/firebase.js` contains:
- `apiKey`, `projectId`, `authDomain`, etc.

**These are PUBLIC and safe to commit.** They are designed to be in client-side code.

### Security Model

✅ **Safe in code:**
- Firebase API keys (public identifiers)
- Project IDs and app IDs

❌ **Never in code:**
- Firebase service_role key (admin access)
- GitHub OAuth Client Secret (in Firebase Console only)

🔒 **Protection:**
- Firestore Security Rules enforce user data isolation
- Users can only read/write their own data at `users/{uid}/apps/pylens`
- Authentication required for all database access

### Authentication

Sign in with GitHub to:
- Sync progress across devices
- Back up progress to the cloud
- Access your data from anywhere

Progress is saved locally even without signing in.

## Tech Stack

- Vanilla JavaScript (no dependencies)
- Firebase (Firestore + Auth)
- GitHub OAuth
- Static HTML/CSS/JS

## License

Built with Claude Code
