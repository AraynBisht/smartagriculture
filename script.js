// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'your-region'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'your-identity-pool-id',
});

// Create a Kinesis client
var kinesis = new AWS.Kinesis({
    apiVersion: '2013-12-02',
    region: 'your-region'
});

// Function to fetch real-time data from Kinesis
function fetchData() {
    var params = {
        ShardId: 'shardId-000000000000',
        StreamName: 'your-stream-name',
        ShardIteratorType: 'LATEST'
    };
    kinesis.getShardIterator(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            var shardIterator = data.ShardIterator;
            var recordsParams = {
                ShardIterator: shardIterator
            };
            kinesis.getRecords(recordsParams, function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    var records = data.Records;
                    var html = '<h3>Real-Time Sensor Data</h3><ul>';
                    records.forEach(function(record) {
                        var payload = JSON.parse(new Buffer(record.Data, 'base64').toString('ascii'));
                        html += '<li>' + JSON.stringify(payload) + '</li>';
                    });
                    html += '</ul>';
                    document.getElementById('realtimeData').innerHTML = html;
                }
            });
        }
    });
}

// Fetch data every 5 seconds
setInterval(fetchData, 5000);
