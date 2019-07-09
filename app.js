const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way')
})

app.get('/pizza/pineapple', (req, res) => {
    res.send('Get the fuck out of here')
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Base Url: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
    `;
    res.send(responseText);
})

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
})

app.get('/greetings', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;

    if (!name) {
        return res.status(400).send('Please provide a name');
    }

    if (!race) {
        return res.status(400).send('Please provide a race');
    }

    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`

    res.send(greeting);
});

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);

    if (!a) {
        return res.status(400).send('We need an a');
    }
    if (!b) {
        return res.status(400).send('We need a b');
    }

    const answer = `The sum of a and b is ${a + b}`;
    res.send(answer);
});

app.get('/grade', (req, res) => {
    const { mark } = req.query;

    if (!mark) {
        return res
            .status(400)
            .send('Please provide a mark');
    }
    const numericMark = parseFloat(mark);
    if (Number.isNaN(numericMark)) {
        return res
            .status(400)
            .send('Mark must be numeric value');
    }
    if (numericMark < 0 || numericMark > 100) {
        return res 
            .status(400)
            .send('Mark must be in range 0 to 100');
    }
    if (numericMark >= 90) {
        return res
            .send('A');
    }
    if (numericMark > 80) {
        return res.send('B');
    }
    if (numericMark >= 70) {
        return res.send('C');
    }
    return res.send('F');
})

app.get('/cipher', (req, res) => {
    const char = req.query.text;
    const shift = parseInt(req.query.shift);
    const base = 'A'.charCodeAt(0);

    if (!char) {
        return res.status(400).send('We need an text');
    }
    if (!shift) {
        return res.status(400).send('We need a shift');
    }

    const newText = char.split('').map(letter => {
        const code = char.charCodeAt(0);
        if (code < base || code > (base + 26)) {
            return char
        }

        let diff = code - base;
        diff = diff + shift
        diff = diff % 26;

        const shiftedChar = String.fromCharCode(base + diff);
        return shiftedChar;
    }).join('');
    res.send(newText)
    console.log('new text is', newText);
})

app.get('/lotto', (req, res) => {
    const { arr } = req.query;
    const lotto = [];
    for (let i = 0; i < 6; i++) {
        lotto.push(Math.floor(Math.random() * 21));
    }

    if (!arr) {
        return res.status(400).send('Missing params')
    }

    let count = lotto.filter(num => arr.includes(num)).length;
    let resp = '';
    if (count < 4) {
        resp = 'Sorry, you lose';
    } else if (count == 4) {
        resp = 'Congratulations, you win a free ticket';
    } else if (count == 5) {
        resp = 'Congratulations, you win $100';
    } else {
        resp = 'Wow! Unbelievable! You could have won the mega millions!';
    }
    res.send(resp)
    console.log(arr)
    console.log(lotto)
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});