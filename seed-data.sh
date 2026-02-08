#!/bin/sh

# Wait for backend to be ready
echo "Waiting for backend to be ready..."
sleep 30

API_URL="http://backend:8080"
BASIC_USER="admin"
BASIC_PASS="password"
AUTH="Basic $(echo -n "$BASIC_USER:$BASIC_PASS" | base64)"

echo "Seeding tasks..."

curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Implement user authentication and session management","description":"Develop a secure authentication system with JWT and session expiration for all user roles.","priority":"High","status":"InProgress"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Design landing page for marketing campaign","description":"Create a visually appealing landing page for the upcoming product launch, including hero section and testimonials.","priority":"Medium","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Refactor database schema for scalability","description":"Analyze current schema and refactor tables to support multi-tenancy and future growth.","priority":"High","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Write integration tests for payment gateway","description":"Ensure all payment flows are covered with robust integration tests using mock services.","priority":"High","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Update documentation for API v2","description":"Revise and expand the API documentation to reflect new endpoints and usage examples.","priority":"Low","status":"Done"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Optimize image loading for mobile","description":"Implement lazy loading and responsive images to improve mobile performance.","priority":"Medium","status":"InProgress"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Conduct user interviews for feedback","description":"Schedule and conduct interviews with 10 users to gather feedback on the new dashboard.","priority":"Medium","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Fix bug in notification system","description":"Resolve the issue where users receive duplicate notifications for the same event.","priority":"High","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Implement dark mode toggle","description":"Allow users to switch between light and dark themes, persisting their preference.","priority":"Low","status":"Done"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Set up CI/CD pipeline for staging","description":"Automate build, test, and deployment processes for the staging environment using GitHub Actions.","priority":"High","status":"InProgress"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Review pull requests for Q2 sprint","description":"Go through all open pull requests and provide feedback or merge as appropriate.","priority":"Medium","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Research analytics tools integration","description":"Evaluate and recommend analytics tools for tracking user engagement and retention.","priority":"Low","status":"Done"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Prepare quarterly financial report","description":"Compile and analyze financial data for the last quarter and prepare a detailed report.","priority":"High","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Upgrade server infrastructure","description":"Migrate to new cloud servers with improved performance and security features.","priority":"High","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Create onboarding tutorial for new users","description":"Design and implement an interactive onboarding tutorial to help new users get started quickly.","priority":"Medium","status":"InProgress"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Audit application for accessibility compliance","description":"Review UI components and flows to ensure compliance with WCAG 2.1 standards.","priority":"High","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Implement password reset feature","description":"Allow users to securely reset their passwords via email verification.","priority":"High","status":"Done"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Analyze customer support tickets","description":"Identify common issues and trends from the last 3 months of support tickets.","priority":"Medium","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Add multi-language support","description":"Enable localization for English, Spanish, and French throughout the application.","priority":"High","status":"InProgress"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Fix layout issues on Safari browser","description":"Resolve CSS bugs causing misalignment on Safari for Mac and iOS devices.","priority":"High","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Develop admin dashboard analytics","description":"Create charts and tables to visualize key metrics for administrators.","priority":"Medium","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Refine search functionality","description":"Improve search accuracy and add filters for date, status, and priority.","priority":"Low","status":"Done"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Integrate Slack notifications","description":"Send real-time updates to Slack channels for important system events.","priority":"Medium","status":"InProgress"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Test backup and restore procedures","description":"Perform a full backup and restore to verify data integrity and disaster recovery.","priority":"High","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Update user profile page design","description":"Redesign the user profile page for better usability and aesthetics.","priority":"Low","status":"Done"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Implement two-factor authentication","description":"Add support for 2FA using authenticator apps or SMS codes.","priority":"High","status":"InProgress"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Monitor server CPU and memory usage","description":"Set up alerts and dashboards to monitor server resource utilization in real time.","priority":"Medium","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Fix email delivery issues","description":"Investigate and resolve problems with outgoing email notifications not reaching users.","priority":"High","status":"Todo"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Research new frontend frameworks","description":"Compare React, Vue, and Svelte for potential migration in the next major release.","priority":"Low","status":"Done"}'
curl -X POST "$API_URL/tasks" -H "Content-Type: application/json" -H "Authorization: $AUTH" -d '{"title":"Plan Q3 roadmap and milestones","description":"Work with stakeholders to define goals and deliverables for the next quarter.","priority":"Medium","status":"Todo"}'

echo "Seeding complete!"
