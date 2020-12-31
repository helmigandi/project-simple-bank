class IndexController {
  static getHomeHandler(req, res){
    res.render('index');
  }
}

module.exports = IndexController;