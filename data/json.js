/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
console.clear();
var jsonData = {
    "creation_date": "31-12-1985",
    "update_date": "04-01-1986",
    "total": 5,
    "score": 7,
    "payment": 123456.789,
    "price": "350 Eur",
    "price2": "349.10003 Eur",
    "serial_number": "AAA-BBB-CCC",
    "numbers": [1, 2, 3],
    "data_array": ["Ax", "Bx", "Cx"],
    "data_array2": [],
    "simple_data_object":
    {
        "firstname": "waza",
        "lastname": "toto"
    },
    "users": [
    {
        "firstname": "dup<b>ooooo</b>ont",
        "lastname": "stéphane",
        "aka": "Number One",
        "status": true,
        "amount": 10,
        "lang": [
        {
            "lang": "french",
            "level": "1"
        },
        {
            "lang": "french",
            "level": "1"
        },
        {
            "lang": "english",
            "level": "4"
        },
        {
            "lang": "spanish",
            "level": "0"
        }],
        "details":
        {
            "birtdate": "01/01/1980",
            "place": "Belgium",
            "cities": [
            {
                "name": "Mons"
            },
            {
                "name": "Brussels"
            }]
        }
    },
    {
        "firstname": "Green",
        "lastname": "John",
        "aka": "Number Two",
        "status": true,
        "amount": 20,
        "lang": [
        {
            "lang": "french",
            "level": "2"
        }],
        "details":
        {
            "birtdate": "10/10/1990",
            "place": "France",
            "cities": [
            {
                "name": "Nancy"
            }]
        }
    },
    {
        "firstname": "Rastapopoulos",
        "lastname": "moticus",
        "aka": "Mortos",
        "status": false,
        "amount": 30,
        "lang": [
        {
            "lang": "english",
            "level": "1"
        },
        {
            "lang": "german",
            "level": "2"
        }],
        "details":
        {
            "birtdate": "31/12/1985",
            "place": "Uk",
            "cities": [
            {
                "name": "manchester"
            },
            {
                "name": "London"
            },
            {
                "name": "Bristol"
            }]
        }
    }, ],
    "details_fruits": [
        ["banana", "yellow"],
        ["apple", "red"],
        ["peach", "pink"]
    ],
    "todo_list": "Aa,Cc,Bb,Dd,Ee",
    "todo_list2": "",
    "todo_list3": [],
    "lesson": "English",
    "lesson2": "Italian",
    "trainings": [],
    "trainings2": [
    {
        "trainer": "Alfred"
    },
    {
        "trainer": "Dorian"
    }],
    "comment": "<p style='background-color:red;'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Lacus vestibulum sed arcu non odio. Suspendisse interdum consectetur libero id faucibus. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Leo duis ut diam quam. Facilisi nullam vehicula ipsum a arcu cursus vitae congue. Sem et tortor consequat id porta nibh. Volutpat lacus laoreet non curabitur. Dui nunc mattis enim ut. Quam nulla porttitor massa id. Dignissim diam quis enim lobortis scelerisque fermentum dui. Est pellentesque elit ullamcorper dignissim cras tincidunt. Neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. In vitae turpis massa sed elementum tempus.</p><p>Ultrices tincidunt arcu non sodales neque sodales.</p>",
    "number1": 9,
    "home": [
    {
        "h_id": "3",
        "city": "Dallas",
        "state": "TX",
        "zip": "75201",
        "price": "162500"
    },
    {
        "h_id": "4",
        "city": "Bevery Hills",
        "state": "CA",
        "zip": "90210",
        "price": "319250"
    },
    {
        "h_id": "6",
        "city": "Dallas",
        "state": "TX",
        "zip": "75000",
        "price": "556699"
    },
    {
        "h_id": "5",
        "city": "New York",
        "state": "NY",
        "zip": "00010",
        "price": "962500"
    }],
    "notes": [1, 2, 3, 4, 5],
    "sentense": "here it is the best string in the world."
};