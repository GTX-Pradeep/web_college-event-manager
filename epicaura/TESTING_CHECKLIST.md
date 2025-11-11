# ✅ Testing Checklist - Registration Link Feature

## Pre-requisites
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] MongoDB connected successfully
- [ ] Browser ready (Chrome/Firefox recommended)

---

## Test 1: Create Event WITH Registration Link

### Steps:
1. [ ] Open http://localhost:3000
2. [ ] Click "Login" in navbar
3. [ ] Login as a club (or create new club account):
   - Email: `coding@club.com`
   - Password: `clubpass123`
4. [ ] Navigate to "Add Event" page
5. [ ] Fill in event details:
   - Title: `Test Registration Event`
   - Description: `Testing Google Forms integration`
   - Category: `Tech`
   - Date: `Select tomorrow's date`
   - Start Time: `9:00 AM`
   - End Time: `11:00 AM`
   - Venue: `Online`
   - Entry Fee: `0`
   - Organizer: `Test Club`
   - Auditorium: `Select any`
   - Registration Link: `https://forms.google.com` (or any URL)
6. [ ] Click "Create Event"
7. [ ] Verify success message appears

### Expected Result:
✅ Event created successfully with registration link saved

---

## Test 2: View Event with Registration Link (As Student)

### Steps:
1. [ ] Logout from club account
2. [ ] Login as student (or don't login):
   - Email: `alice@student.com`
   - Password: `password123`
3. [ ] Go to "Events" page
4. [ ] Find the "Test Registration Event" card

### Expected Visual Elements:
- [ ] Event card has purple border on hover
- [ ] Cursor changes to pointer when hovering
- [ ] "🔗 Click to Register" badge visible at top-right
- [ ] Badge has pulsing animation
- [ ] Card has subtle scale effect on hover

---

## Test 3: Click Event Card to Register

### Steps:
1. [ ] Click anywhere on the "Test Registration Event" card
2. [ ] Observe what happens

### Expected Result:
✅ New browser tab opens with the registration link (Google Forms)
✅ Original tab stays on Events page (no navigation)

---

## Test 4: Create Event WITHOUT Registration Link

### Steps:
1. [ ] Login as club account
2. [ ] Go to "Add Event"
3. [ ] Fill in all details EXCEPT registration link:
   - Title: `Event Without Link`
   - All other fields filled
   - **Registration Link: Leave empty**
4. [ ] Click "Create Event"

### Expected Result:
✅ Event created successfully even without registration link

---

## Test 5: View Event WITHOUT Registration Link

### Steps:
1. [ ] Go to Events page
2. [ ] Find "Event Without Link" card

### Expected Visual Elements:
- [ ] NO "Click to Register" badge visible
- [ ] Card does NOT have clickable styling
- [ ] Cursor remains default (NOT pointer)
- [ ] NO purple border on hover
- [ ] Card looks normal, not clickable

---

## Test 6: Time Conflict Detection

### Steps:
1. [ ] Login as club
2. [ ] Create Event 1:
   - Date: Tomorrow
   - Start: 9:00 AM
   - End: 11:00 AM
   - Auditorium: Main Auditorium
3. [ ] Try to create Event 2:
   - Date: Same as Event 1
   - Start: 10:00 AM (overlaps!)
   - End: 12:00 PM
   - Auditorium: Main Auditorium (same!)

### Expected Result:
❌ Error message: "This auditorium is already booked for that time slot"
✅ Event NOT created

---

## Test 7: Different Auditoriums (No Conflict)

### Steps:
1. [ ] Create Event 1:
   - Date: Tomorrow
   - Start: 9:00 AM
   - End: 11:00 AM
   - Auditorium: Main Auditorium
2. [ ] Create Event 2:
   - Date: Tomorrow
   - Start: 9:00 AM (same time!)
   - End: 11:00 AM (same time!)
   - Auditorium: Auditorium 1A (different!)

### Expected Result:
✅ Both events created successfully (different auditoriums)

---

## Test 8: Check Auditorium Bookings

### Steps:
1. [ ] Login as club
2. [ ] Go to "Auditoriums" page
3. [ ] Select tomorrow's date
4. [ ] View bookings

### Expected Display:
- [ ] Shows all events for that date
- [ ] Each booking shows:
  - Event name
  - Club name
  - **Time range** (e.g., "9:00 AM - 11:00 AM")
  - Auditorium details

---

## Test 9: About Page Updates

### Steps:
1. [ ] Navigate to "About" page
2. [ ] Read the content

### Expected Content:
- [ ] Mentions time-based booking system
- [ ] Explains registration link feature
- [ ] Shows how students can click to register
- [ ] Updated feature lists for both students and clubs
- [ ] Includes "Smart Features" section

---

## Test 10: Backend Endpoint Test

### Steps:
1. [ ] Open new PowerShell terminal
2. [ ] Run:
```powershell
cd backend
.\test-endpoints.ps1
```

### Expected Results:
- [ ] All 14 tests pass
- [ ] Test 13 (time conflict) shows error as expected
- [ ] Registration link included in test event creation
- [ ] No errors in terminal

---

## Browser Console Check

### Steps:
1. [ ] Press F12 to open DevTools
2. [ ] Click on Console tab
3. [ ] Click on various event cards

### Expected:
- [ ] NO errors in console
- [ ] NO warnings about missing props
- [ ] Clean output

---

## Mobile Responsiveness (Bonus)

### Steps:
1. [ ] Press F12
2. [ ] Toggle device toolbar (Ctrl+Shift+M)
3. [ ] Test on mobile view (iPhone/Android)

### Expected:
- [ ] Event cards stack vertically
- [ ] Click to register badge visible
- [ ] Touch works for clicking cards
- [ ] All text readable

---

## Final Verification

### Checklist:
- [ ] Events with registration links are clickable
- [ ] Events without registration links are NOT clickable
- [ ] Time conflicts are properly detected
- [ ] Different auditoriums don't conflict
- [ ] New tabs open (don't navigate away)
- [ ] Visual feedback works (hover, cursor, badge)
- [ ] About page explains new features
- [ ] Backend tests all pass

---

## 🐛 If Something Doesn't Work

1. **Event card not clickable:**
   - Check if registrationLink is saved in database
   - Open DevTools → Network → Check event data

2. **Time conflict not working:**
   - Verify times are in correct format (HH:MM AM/PM)
   - Check backend console for errors

3. **Registration link not opening:**
   - Check browser popup blocker
   - Verify URL is valid (starts with http:// or https://)

4. **Styling issues:**
   - Clear browser cache (Ctrl+Shift+Delete)
   - Hard reload (Ctrl+F5)

---

## 📊 Success Criteria

All tests must pass:
- ✅ Events created with registration links
- ✅ Click functionality works
- ✅ Visual feedback present
- ✅ Time conflicts detected
- ✅ Events without links behave normally
- ✅ No console errors
- ✅ Backend tests pass

---

**Testing Date:** _____________
**Tested By:** _____________
**Status:** [ ] PASSED / [ ] FAILED
**Notes:** ___________________________________
