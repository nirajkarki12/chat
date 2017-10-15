const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
    accessKeyId: 'AKIAJ6ZMQTKJJPCGKUAQ',
	secretAccessKey: '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',
	region: 'ap-south-1'
});

const s0 = new AWS.S3({});
const upload = multer({
    storage: multerS3({
        s3: s0,
        bucket: 'newchatapp', //Bucket name
        acl: 'public-read', //Access Control List
        metadata: function(req, file, cb){
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb){
            cb(null, file.originalname);
        }
    }),

    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase();
    }
})

exports.Upload = upload;