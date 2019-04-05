
# PROJECT NAME

---

Name: Jordan Woo

Date: 4/5/2019

Project Topic: Pixel art 

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     pixels            `Type: String (array-ish - on piazza was told this counted for array req)`
- `Field 2`:     name              `Type: String`
- `Field 3`:     author            `Type: String`
- `Field 4`:     submittedAt       `Type: Date`
- `Field 5`:     density           `Type: Number`
- `Field 6`:     id                `Type: Number`

Schema: 
```javascript
{
    pixels: String,
    name: String,
    author: String,
    submittedAt: Date,
    density: Number,
    id: Number
}
```

### 2. Add New Data

HTML form route: `/submit`

POST endpoint route: `/api/submit`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/submit',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        pixels: "9999999999999999999999999999999999999999999999999999999999999999999992999999999999999999999999999999999999999999999999999999999999999999999999999999999992999999929999999999999999999999999999999999992999999999999999999999999999999999999999999999999999999999",
        name: "my art",
        author: "bob",
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/all`

### 4. Search Data

Search Field: name

### 5. Navigation Pages

Navigation Filters
1. Sort by time -> `/time`
2. Sort by density -> `/density`
3. Find pics with color -> `/color/:color`
4. Find pics by author -> `/authors/:author`
5. Random pic -> `/random`

