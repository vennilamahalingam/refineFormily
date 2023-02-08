import { Button, Card, Space } from "antd";

const Jsonpdf = () => {
    const docData = {
      'data' :  {
          "list": [
            { "year": 2012, "value": 3.83, "ovalue": 1245.49 },
            { "year": 2013, "value": 4.67, "ovalue": 2414.49 },
            { "year": 2014, "value": 3.65, "ovalue": 4313.12 },
            { "year": 2015, "value": 2.55, "ovalue": 7982.23 },
            { "year": 2016, "value": 1.23, "ovalue": 8521.54 },
            { "year": 2017, "value": 3.31, "ovalue": 1780.23 }
          ]
        
        },
        "convertTo":"pdf",
        
      };
    const bearerToken = 'test_eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1NTE4NTkwNjY4NjM1OTc0OTciLCJhdWQiOiJjYXJib25lIiwiZXhwIjoyMzM3NTAxOTI4LCJkYXRhIjp7ImlkQWNjb3VudCI6IjU1MTg1OTA2Njg2MzU5NzQ5NyJ9fQ.AXRFa93a8LGEu05IX9rHwZrSrBUJz8gNwvJqRIm8GtF5bXcx-JB_0BKrgcEsdQUCF3BJppEeYbciqXYPR15qdZT1AEJ1WzG8oOtRFUSJfK-6Y9-f_sXNHDQxFOpDGFrfBZNt_IYOnT3wGx8MY--oEuX2SUskVfzQ0H1hmLK6aT-B5Bvr';
    const templateId = '33c9e421357523de88b00067b19f146e207fff622fafbf694f82fadf552eee39';
  
    const generateCarbonePdf = () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + bearerToken,
        'carbone-version': '4' ,
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(docData),
    };
    fetch(`https://api.carbone.io/render/${templateId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          downloadCarbonePdf(data.data.renderId)
        });
    }
    const downloadCarbonePdf = (renderId: string) => {
      fetch('https://api.carbone.io/render/'+renderId)
      .then(response => response.blob())
      .then(blob => {
        const blobData = new Blob([blob], { type: 'pdf' });  
        const csvURL = window.URL.createObjectURL(blobData);
        let tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'refineReport.pdf');
        tempLink.click();

      });
    }
    return(<>
    <Space>
      <Card style={{ width: 300 }}>
          <Button onClick={generateCarbonePdf}>
              Generate and download PDF Report
          </Button>
      </Card>
    </Space>
    </>)
}

export default Jsonpdf