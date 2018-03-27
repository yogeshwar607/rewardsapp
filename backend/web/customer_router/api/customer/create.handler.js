const Joi = require('joi');
const Customer = rootRequire('models').Customer;
// const Otp = rootRequire('models').Otp;
var nodemailer = require('nodemailer');

// const indexMapping = rootRequire('models').IndexMapping;

const { customerJoiSchema } = rootRequire('commons').SCHEMA;
const { ValidationError } = rootRequire('commons').ERROR;

function enrichCustomerObj(body) {
    return {
        name: body.name,
        email: body.email,
        password: body.password,
        mobile_no: body.mobile_no,
        dob: body.dob,
        state: body.state,
        city: body.city,
        country: body.country,
        is_active: body.is_active,
        interests: body.interests,
        verify: { mobile_no: true },
        // addressess: body.addressess,
        gender: body.gender
    };
}

async function logic({ body, context }) {
    try {
        console.log(body);
        const CustomerObj = enrichCustomerObj(body, context);
        // const { error } = Joi.validate(CustomerObj, customerJoiSchema);
        // if (error) throw new ValidationError(`Customer Validation Error : ${error.message}`);
        const customer = await Customer.findOne({ email: CustomerObj.email });
        if (customer) throw new ValidationError('Email already exists');
        console.log(CustomerObj);

        const CustomerOb = new Customer(CustomerObj);
        let custo = await CustomerOb.save();
        sendMail(custo).then(data => {
                return custo;
            })
            .catch(err => next(err));


    } catch (e) {
        logger.error(e);
        throw e;
    }
}

function handler(req, res, next) {
    logic(req)
        .then(data => {
            res.json({
                success: true,
                data,
            });
        })
        .catch(err => next(err));
}
module.exports = handler;

async function sendMail(custo) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sid.srivastava28@gmail.com', // Your email id
            pass: 'marjavamitjava' // Your password
        }
    });

    let text = 'Click on the link to verify: ' + "http://localhost:4700/api/v1/email/verify/" + custo._id;

    let mailOptions = {
        from: 'sid.srivastava28@gmail.com', // sender address
        to: custo.email, // list of receivers
        subject: 'Tryy: Email Verify', // Subject line
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            // res.json({ yo: 'error' });
        } else {
            console.log('Message sent: ' + info.response);
            return true;
            // res.json({ yo: info.response });
        };
    });


}