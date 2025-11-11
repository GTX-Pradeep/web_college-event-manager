# EpicAura Backend API Test Script
Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  EPICAURA BACKEND API TESTING SUITE" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

$baseUrl = "http://localhost:5000"

# Test 1: Default Route
Write-Host "[TEST 1] GET / - Default Route" -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/" -Method GET
    Write-Host "✅ SUCCESS: $response" -ForegroundColor Green
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n----------------------------------------`n"

# Test 2: Initialize Auditoriums
Write-Host "[TEST 2] POST /api/auditoriums/initialize - Initialize Auditoriums" -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auditoriums/initialize" -Method POST -ContentType 'application/json'
    Write-Host "✅ SUCCESS:" -ForegroundColor Green
    $response | Format-List
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n----------------------------------------`n"

# Test 3: Get All Auditoriums
Write-Host "[TEST 3] GET /api/auditoriums - Get All Auditoriums" -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auditoriums" -Method GET
    Write-Host "✅ SUCCESS: Found $($response.Count) auditoriums" -ForegroundColor Green
    $response | Select-Object name, capacity -First 5 | Format-Table
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n----------------------------------------`n"

# Test 4: Signup - Student
Write-Host "[TEST 4] POST /api/auth/signup - Student Signup" -ForegroundColor Cyan
$signupStudent = @{
    name = "Alice Student"
    email = "alice@student.com"
    password = "password123"
    role = "student"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/signup" -Method POST -Body $signupStudent -ContentType 'application/json'
    Write-Host "✅ SUCCESS:" -ForegroundColor Green
    $response | Format-List
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n----------------------------------------`n"

# Test 5: Signup - Club
Write-Host "[TEST 5] POST /api/auth/signup - Club Signup" -ForegroundColor Cyan
$signupClub = @{
    name = "Coding Club"
    email = "coding@club.com"
    password = "clubpass123"
    role = "club"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/signup" -Method POST -Body $signupClub -ContentType 'application/json'
    Write-Host "✅ SUCCESS:" -ForegroundColor Green
    $response | Format-List
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n----------------------------------------`n"

# Test 6: Login - Club
Write-Host "[TEST 6] POST /api/auth/login - Club Login" -ForegroundColor Cyan
$loginClub = @{
    email = "coding@club.com"
    password = "clubpass123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method POST -Body $loginClub -ContentType 'application/json'
    Write-Host "✅ SUCCESS:" -ForegroundColor Green
    $response | Format-List
    $clubToken = $response.token
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n----------------------------------------`n"

# Test 7: Create Event (requires club token)
Write-Host "[TEST 7] POST /api/events - Create Event (Club)" -ForegroundColor Cyan
$newEvent = @{
    name = "Hackathon 2025"
    category = "Tech"
    date = "2025-12-15"
    startTime = "10:00 AM"
    endTime = "05:00 PM"
    venue = "MRD Auditorium"
    auditorium = "MRD Auditorium"
    poster = "https://example.com/poster.jpg"
    registrationLink = "https://forms.google.com/hackathon2025"
    isPaid = $true
    price = 100
    description = "Annual coding hackathon"
    clubName = "Coding Club"
} | ConvertTo-Json

try {
    $headers = @{
        "Authorization" = "Bearer $clubToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/events" -Method POST -Body $newEvent -ContentType 'application/json' -Headers $headers
    Write-Host "✅ SUCCESS:" -ForegroundColor Green
    $response | Format-List
    $eventId = $response.event._id
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n----------------------------------------`n"

# Test 8: Get All Events
Write-Host "[TEST 8] GET /api/events - Get All Events" -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/events" -Method GET
    Write-Host "✅ SUCCESS: Found $($response.Count) events" -ForegroundColor Green
    $response | Select-Object name, category, date, clubName | Format-Table
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n----------------------------------------`n"

# Test 9: Get Upcoming Events
Write-Host "[TEST 9] GET /api/events/upcoming - Get Upcoming Events" -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/events/upcoming" -Method GET
    Write-Host "✅ SUCCESS: Found $($response.Count) upcoming events" -ForegroundColor Green
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n----------------------------------------`n"

# Test 10: Get Past Events
Write-Host "[TEST 10] GET /api/events/past - Get Past Events" -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/events/past" -Method GET
    Write-Host "✅ SUCCESS: Found $($response.Count) past events" -ForegroundColor Green
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n----------------------------------------`n"

# Test 11: Get My Events (Club)
Write-Host "[TEST 11] GET /api/events/my-events - Get Club's Events" -ForegroundColor Cyan
try {
    $headers = @{
        "Authorization" = "Bearer $clubToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/events/my-events" -Method GET -Headers $headers
    Write-Host "✅ SUCCESS: Found $($response.Count) events for this club" -ForegroundColor Green
    $response | Select-Object name, date | Format-Table
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n----------------------------------------`n"

# Test 12: Submit Contact Form
Write-Host "[TEST 12] POST /api/contact - Submit Contact Form" -ForegroundColor Cyan
$contactForm = @{
    name = "Test Student"
    srn = "PES1202100123"
    branch = "CSE"
    department = "Computer Science"
    query = "When is the next tech event?"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/contact" -Method POST -Body $contactForm -ContentType 'application/json'
    Write-Host "✅ SUCCESS:" -ForegroundColor Green
    $response | Format-List
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n----------------------------------------`n"

# Test 13: Check Auditorium Availability
Write-Host "[TEST 13] GET /api/auditoriums/availability - Check Availability for Date" -ForegroundColor Cyan
try {
    $checkDate = "2025-12-15"
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auditoriums/availability/$checkDate" -Method GET
    Write-Host "✅ SUCCESS: Auditorium availability for $checkDate" -ForegroundColor Green
    $response | Select-Object name, isAvailable | Format-Table
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n----------------------------------------`n"

# Test 14: Create Overlapping Event (Should fail)
Write-Host "[TEST 14] POST /api/events - Create Overlapping Event (Expected: Conflict)" -ForegroundColor Cyan
$overlappingEvent = @{
    name = "Workshop 2025"
    category = "Tech"
    date = "2025-12-15"
    startTime = "02:00 PM"
    endTime = "06:00 PM"
    venue = "MRD Auditorium"
    auditorium = "MRD Auditorium"
    poster = "https://example.com/poster.jpg"
    isPaid = $false
    price = 0
    description = "Tech workshop - should conflict with existing booking"
    clubName = "Coding Club"
} | ConvertTo-Json

try {
    $headers = @{
        "Authorization" = "Bearer $clubToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/events" -Method POST -Body $overlappingEvent -ContentType 'application/json' -Headers $headers
    Write-Host "✅ RESPONSE:" -ForegroundColor Yellow
    $response | Format-List
} catch {
    Write-Host "✅ EXPECTED CONFLICT DETECTED:" -ForegroundColor Green
    Write-Host $_.Exception.Message -ForegroundColor Yellow
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  TESTING COMPLETED" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green
