
var routes = [
  {
    path: '/',
    url: '/index.html'
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },

  {
    path: '/home/',
    componentUrl: './pages/home.html',
  },
  {
    path: '/recette/:recetteId/',
    url: "./pages/recette.html",
    on: {
      pageAfterIn: function(e, page){
        var router = this;
        var app = router.app;
        var recipeId = page.route.params.recetteId;
        console.log(recipeId);
        app.request({
          url: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeId, //URL de L'api
          method: "GET", // Méthode 
          dataType: "json", // Important, sinon vous allez récupérer un string et non un objet
          beforeSend: function () {
            // Avant de récupérer mes datas, j'affiche un loader 
            //(important quand on fait un traitement pour montrer qu'il est en cours +  empêcher les impatients de cliquer partout pendant le process !)
            app.dialog.preloader();
          },
          success: function (res) {
            // res correspond à la réponse
            console.log(res);
            $('.recipe-name').html(res.meals[0].strMeal)
            $('.recipe-thumbnail').html(res.meals[0].strMealThumb)
            $('.recipe-instructions').html(res.meals[0].strInstructions)

            // Je ferme le loader
            app.dialog.close();
          },
        });
      }
    }
  },

  {
    path: '/categories/',
    url: "./pages/categories.html",
    on: {
      pageAfterIn: function(e, page){
        var router = this;
        var app = router.app;
        app.request({
          url: "https://www.themealdb.com/api/json/v1/1/categories.php", //URL de L'api
          method: "GET", // Méthode 
          dataType: "json", // Important, sinon vous allez récupérer un string et non un objet
          beforeSend: function () {
            // Avant de récupérer mes datas, j'affiche un loader 
            //(important quand on fait un traitement pour montrer qu'il est en cours +  empêcher les impatients de cliquer partout pendant le process !)
            app.dialog.preloader();
          },
          success: function (res) {
            // res correspond à la réponse
            console.log(res);
            $('.categorie-id').html(res.categories[0].idCategory)
            $('.categorie-name').html(res.meals[0].strCategory)
            $('.categorie-thumbnail').html(res.meals[0].strCategoryThumb)
            $('.categorie-description').html(res.meals[0].strCategoryDescription)
           
            // Je ferme le loader
            app.dialog.close();
          },
        });
      }
    }
  },

  {
    path: '/form/',
    url: './pages/form.html',
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    componentUrl: './pages/dynamic-route.html',
  },
  
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
