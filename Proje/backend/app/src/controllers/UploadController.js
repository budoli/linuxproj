const upload = require('../models/UploadModel');

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send('파일이 업로드되지 않았습니다.');
  }
  res.json({
    message: '이미지가 성공적으로 업로드되었습니다.',
    filename: req.file.filename,
    redirectUrl: '/login'
  });
};

exports.renderForm = (req, res) => {
  res.sendFile(path.join(__dirname, "../view/login.ejs"));
};

