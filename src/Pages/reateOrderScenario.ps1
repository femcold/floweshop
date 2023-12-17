# PowerShell script to simulate creating an order

# Set your server URL
$serverUrl = "http://localhost:5000"

# Step 1: Generate a sales order number
$response = Invoke-RestMethod -Uri "$serverUrl/api/generate-sales-order-number" -Method Get
$salesOrderNumber = $response.salesOrderNumber
Write-Host "Generated Sales Order Number: $salesOrderNumber"

# Step 2: Create a new order (adjust the payload as needed)
$orderPayload = @{
    customerAccount = "CA222356"
    currency = "USD"
    orderType = "Sales Order"
    deliveryDate = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
    deliveryMethod = "Uber"
}

$orderResponse = Invoke-RestMethod -Uri "$serverUrl/api/create-order" -Method Post -Body ($orderPayload | ConvertTo-Json) -ContentType "application/json"
Write-Host "Created Order with Sales Order Number: $($orderResponse.salesOrderNumber)"

# Step 3: Fetch the order details
$orderDetailsResponse = Invoke-RestMethod -Uri "$serverUrl/api/fetch-order-details?salesOrderNumber=$($orderResponse.salesOrderNumber)" -Method Get
Write-Host "Fetched Order Details:"
Write-Host $orderDetailsResponse
