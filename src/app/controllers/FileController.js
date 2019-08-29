import File from '../models/File';

class FileController {
  async store(req, res) {
    // console.log(req.file)
    const { originalname: name, filename: path } = req.file;
    // console.log(name, path)
    const file = await File.create({
      name,
      path,
    });
    // return res.json({"msg":"ok"})
    return res.json(file);
  }
}

export default new FileController();
