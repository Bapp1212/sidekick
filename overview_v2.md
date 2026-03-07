## Campus Circles (Women+) — Hackathon Final Plan (1:1 Safe Walk)

### Core idea
A women-only (self-declared), **university-email-verified** app that accelerates student life via:
1) **Fast Q&A** (trusted answers for modules/admin/careers)
2) **Safe Walk (1:1)**: quickly match with another verified student to walk together, confirm identity using a per-session PIN, and coordinate via a simple live map.

---

## MVP Scope (what we will build)
### Must-have
- Student email sign-in (domain allowlist)
- Auto-generated nickname (displayed everywhere instead of real name)
- Q&A feed (post question, answer, mark helpful)
- Safe Walk 1:1:
  - create request (from/to, leaving now/in 5/10/15)
  - accept a request (first-come-first-served)
  - auto-create a session with 2 PINs
  - PIN mutual confirmation
  - live-ish map (2 markers updated every ~10s)
  - end session

### Explicitly out of scope
- Alumni, random global chat
- Government ID / AI selfie checks
- Group walks (only 1:1)
- Push notifications (in-app refresh/subscription only)
- Full route navigation (no directions; just live markers)

---

## UX / Screen Flow

### Auth + Profile
1. Welcome
2. Enter university email
3. Verify (OTP or magic link)
4. Profile setup:
   - nickname auto-generated (user can “regenerate” up to 3 times)
   - year + course optional
   - tags (optional)

### Main tabs
**Tab 1: Q&A**
- Feed (list)
- Ask Question
- Question Detail → Answer → Mark Helpful

**Tab 2: Safe Walk**
- Create Request (From, To, Leave in: now/5/10/15)
- Request Board (list of open requests)
- Request Detail (Accept)
- Session Screen:
  - shows your nickname + partner nickname
  - shows **Your PIN**
  - input: “Enter partner PIN”
  - status: Matched → Verified → Ended
- Map Screen (can be part of Session screen):
  - two markers (you + partner)
  - “last updated” timestamps

**Tab 3: Profile**
- nickname + regenerate (limited)
- logout

---

## Safety Design (simple but strong)
- No real names displayed (nickname only).
- Campus-only access via verified email domain.
- PIN handshake:
  - each user sees only *their* PIN
  - must enter partner’s PIN to unlock “Verified” status
- Basic Block/Report (optional if time)

---

## Tech Stack
- React Native (Expo)
- Firebase Auth (email verification)
- Firestore (users, questions, answers, walkRequests, walkSessions)
- expo-location + react-native-maps
- React Navigation
- UI: NativeWind or React Native Paper

---

## Data Model (minimal)

### users/{uid}
- nickname: string
- email: string
- createdAt

### questions/{qid}
- authorId
- title
- body
- category
- createdAt

### questions/{qid}/answers/{aid}
- authorId
- body
- createdAt
- helpfulCount

### walkRequests/{rid}
- requesterId
- fromLabel
- toLabel
- leavingInMins (0/5/10/15)
- status: "open" | "matched" | "expired"
- createdAt
- matchedSessionId? (optional)

### walkSessions/{sid}
- userAId (requester)
- userBId (acceptor)
- pinA
- pinB
- verifiedA: boolean
- verifiedB: boolean
- status: "matched" | "verified" | "ended"
- userALocation: { lat, lng, updatedAt } | null
- userBLocation: { lat, lng, updatedAt } | null
- createdAt
- endedAt?

---

## Matching Logic (hackathon-simple)
- A user creates a request → appears in Request Board.
- Another user taps Accept → create session:
  - generate pinA + pinB (4–6 digits)
  - set request.status = "matched"
  - open Session screen for both users

---

## Live Map (simplified “Uber-like”)
- After session starts (or after verification), the app:
  - requests location permission
  - updates location in Firestore every ~10 seconds (or on movement)
- Session screen subscribes to session doc to display partner marker.

---

## Demo Script (2 minutes)
1) Sign in with university email → nickname appears
2) Post a module question → another account answers → mark helpful
3) Create Safe Walk request (Library → Dorms, leaving now)
4) Other account accepts → both see session + PIN
5) Show PIN exchange + verify
6) Show map with two moving markers
7) End session
