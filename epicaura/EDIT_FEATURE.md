# ✏️ Edit Event Feature - Documentation

## Overview
Clubs can now edit their existing events with full validation and time conflict detection.

---

## Features

### ✅ What Clubs Can Edit:
- Event title
- Description
- Category
- Date
- Start time
- End time
- Venue
- Image URL
- Entry fee
- Organizer name
- Auditorium
- Registration link

### 🔒 Security Features:
- Only the club that created the event can edit it
- JWT authentication required
- Role verification (club-only access)
- Event ownership validation

### 🚨 Conflict Detection:
- Checks for time slot conflicts when editing
- Prevents overlapping bookings on same auditorium
- Updates booking record when auditorium/date changes
- Validates time ranges

---

## How to Use

### For Clubs:

#### 1. Navigate to Your Events
```
Login → Your Events page
```

#### 2. Find Event to Edit
- Browse your events list
- Click the **✏️ Edit** button on any event

#### 3. Modify Event Details
- Update any fields you want to change
- All fields from creation are available
- Form pre-fills with existing data

#### 4. Submit Changes
- Click **Update Event** button
- System validates changes
- Checks for time conflicts
- Updates database

#### 5. Cancel if Needed
- Click **Cancel** button to go back without saving
- No changes are applied

---

## Backend Implementation

### API Endpoint
```
PUT /api/events/:id
```

### Request Headers
```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

### Request Body
```json
{
  "title": "Updated Event Title",
  "description": "Updated description",
  "category": "Tech",
  "date": "2025-11-15",
  "startTime": "10:00 AM",
  "endTime": "12:00 PM",
  "venue": "Updated Venue",
  "image": "https://example.com/image.jpg",
  "entryFee": 100,
  "organizer": "Updated Organizer",
  "auditoriumId": "60d5ec49f1b2c72b8c8e4a1b",
  "registrationLink": "https://forms.google.com/..."
}
```

### Response (Success)
```json
{
  "message": "Event updated successfully ✅",
  "event": {
    "_id": "60d5ec49f1b2c72b8c8e4a1a",
    "title": "Updated Event Title",
    // ... other fields
  }
}
```

### Response (Conflict)
```json
{
  "message": "This auditorium is already booked from 9:00 AM to 11:00 AM on this date"
}
```

### Response (Unauthorized)
```json
{
  "message": "You can only update your own events"
}
```

---

## Frontend Implementation

### Route
```
/edit-event/:id
```

### Component
```jsx
EditEvent.jsx
```

### Features:
- Fetches existing event data on load
- Pre-fills form with current values
- Validates all inputs
- Shows loading state
- Handles errors gracefully
- Redirects after successful update

### Navigation Flow
```
Your Events → Click Edit → Edit Event Form → Update → Back to Your Events
```

---

## Code Changes

### 1. Backend Route Enhanced (`backend/src/routes/events.js`)
```javascript
// Enhanced PUT route with conflict detection
router.put("/:id", auth, async (req, res) => {
  // 1. Verify user is a club
  // 2. Check event exists and ownership
  // 3. Validate time conflicts if auditorium/date/time changed
  // 4. Update event
  // 5. Update associated booking
});
```

### 2. New Frontend Component (`frontend/src/pages/Club/EditEvent.jsx`)
- Fetches event data using ID from URL params
- Pre-fills form with existing values
- Handles form submission
- Error handling and loading states

### 3. Updated YourEvents Component
```jsx
// Added Edit button alongside Delete
<button onClick={() => navigate(`/edit-event/${event._id}`)}>
  ✏️ Edit
</button>
```

### 4. New Route in App.jsx
```jsx
<Route path="/edit-event/:id" element={
  <ProtectedRoute requireAuth allowedRoles={['club']}>
    <EditEvent />
  </ProtectedRoute>
} />
```

### 5. Enhanced CSS (`ClubPages.css`)
- Styled edit button with purple gradient
- Added form action buttons
- Responsive design for mobile

---

## Validation Rules

### Time Conflict Detection:
```javascript
// Conflicts if:
// (Start1 < End2) AND (Start2 < End1)

Example:
Existing: 9:00 AM - 11:00 AM
Trying:   10:00 AM - 12:00 PM
Result:   ❌ CONFLICT

Existing: 9:00 AM - 11:00 AM  
Trying:   11:00 AM - 1:00 PM
Result:   ✅ NO CONFLICT
```

### Field Requirements:
- Title: Required, string
- Description: Required, string
- Category: Required, dropdown selection
- Date: Required, date format
- Start Time: Required, "HH:MM AM/PM" format
- End Time: Required, "HH:MM AM/PM" format
- Venue: Required, string
- Entry Fee: Required, number >= 0
- Organizer: Required, string
- Auditorium: Required, ObjectId reference
- Image: Optional, URL format
- Registration Link: Optional, URL format

---

## Testing the Feature

### Test Case 1: Successful Edit
1. Login as club
2. Go to Your Events
3. Click Edit on any event
4. Change title to "Updated Test Event"
5. Click Update Event
6. ✅ Should see success message
7. ✅ Event should show new title

### Test Case 2: Time Conflict
1. Create Event A: Tomorrow, 9:00 AM - 11:00 AM, Main Auditorium
2. Create Event B: Tomorrow, 2:00 PM - 4:00 PM, Main Auditorium
3. Edit Event B
4. Change time to 10:00 AM - 12:00 PM (conflicts with Event A)
5. Click Update Event
6. ❌ Should see conflict error message
7. ✅ Event should NOT be updated

### Test Case 3: No Conflict (Different Auditorium)
1. Edit Event B
2. Change auditorium to Auditorium 1A
3. Change time to 9:00 AM - 11:00 AM (same as Event A)
4. Click Update Event
5. ✅ Should update successfully (different auditoriums)

### Test Case 4: Authorization Check
1. Try to access edit URL directly: `/edit-event/<some_event_id>`
2. If not logged in → ✅ Redirects to login
3. If logged in as student → ✅ Redirects to home
4. If event belongs to another club → ❌ Error message

### Test Case 5: Cancel Button
1. Click Edit on any event
2. Change some fields
3. Click Cancel
4. ✅ Returns to Your Events
5. ✅ No changes saved

---

## UI/UX Features

### Visual Feedback:
- **Edit Button**: Purple gradient, hover lift effect
- **Loading State**: Shows "Loading event details..."
- **Form Pre-fill**: All fields auto-populate
- **Error Messages**: Clear, user-friendly alerts
- **Success Redirect**: Auto-returns to Your Events

### Button Styling:
- **Edit Button**: Purple gradient (#667eea to #764ba2)
- **Update Button**: Same purple gradient
- **Cancel Button**: Gray (#6c757d)
- **Delete Button**: Red (#ff6b6b)

### Responsive Design:
- Desktop: Two-column form layout
- Mobile: Single column, stacked buttons
- All devices: Touch-friendly buttons

---

## Error Handling

### Frontend Errors:
```javascript
try {
  await axios.put(`/api/events/${id}`, formData);
  alert('Success!');
} catch (error) {
  alert(error.response?.data?.message || 'Failed to update');
}
```

### Backend Errors:
- 403: Not a club / Not your event
- 404: Event not found
- 400: Time conflict detected
- 500: Server error

---

## Database Updates

### Event Document:
```javascript
// Before
{ title: "Old Title", ... }

// After
{ title: "New Title", ... }
```

### Booking Document (if auditorium/date changed):
```javascript
// Before
{ eventId: "...", auditoriumId: "old_aud", date: "2025-11-10" }

// After
{ eventId: "...", auditoriumId: "new_aud", date: "2025-11-15" }
```

---

## Future Enhancements

### Possible Additions:
- 📝 Edit history/changelog
- 🔔 Notify users of event changes
- 📊 Track edit count
- 🔄 Restore to previous version
- 📅 Bulk edit multiple events
- 🖼️ Image upload (not just URL)
- 📧 Email confirmation on edit

---

## Technical Details

### Dependencies:
- React Router (useParams, useNavigate)
- Axios (HTTP requests)
- Context API (authentication)

### State Management:
```javascript
const [formData, setFormData] = useState({...});
const [loading, setLoading] = useState(true);
const [auditoriums, setAuditoriums] = useState([]);
```

### API Calls:
```javascript
// Fetch event
GET /api/events/:id

// Fetch auditoriums
GET /api/auditoriums

// Update event
PUT /api/events/:id
```

---

## Common Issues & Solutions

### Issue 1: "Event not found"
**Solution**: Check if event ID is valid, event might have been deleted

### Issue 2: "You can only update your own events"
**Solution**: Ensure you're logged in with the correct club account

### Issue 3: Time conflict error
**Solution**: Choose a different time slot or auditorium

### Issue 4: Form not pre-filling
**Solution**: Check network tab, ensure event fetch is successful

### Issue 5: Cancel button not working
**Solution**: Verify React Router navigation is set up correctly

---

## Summary

✅ **Implemented**: Full edit functionality for events  
✅ **Security**: Only event owners can edit  
✅ **Validation**: Time conflict detection included  
✅ **UX**: Clean interface with loading states  
✅ **Responsive**: Works on all devices  
✅ **Error Handling**: Clear error messages  

**Status**: READY FOR TESTING 🚀

---

**Last Updated**: Now with edit functionality!  
**Version**: 2.1.0
