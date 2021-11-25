
var routes = [
  {
    path: '/',
    url: '/index.html'
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
            //console.log(res);
            $('.recipe-name').html(res.meals[0].strMeal)
            $('.recipe-instructions').html(res.meals[0].strInstructions)
            $('.recette-thumbnail').attr('src', res.meals[0].strMealThumb );

            // Je ferme le loader
            app.dialog.close();
          },
        });
      }
    }
  },

  {
    path: '/categories/:categorieId/',
    url: "./pages/categories.html",
    on: {
      pageAfterIn: function(e, page){
        var router = this;
        var app = router.app;
        var categorieId = page.route.params.categorieId;
        app.request({
          url: "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + categorieId, //URL de L'api
          method: "GET", // Méthode 
          dataType: "json", // Important, sinon vous allez récupérer un string et non un objet
          beforeSend: function () {
            // Avant de récupérer mes datas, j'affiche un loader 
            //(important quand on fait un traitement pour montrer qu'il est en cours +  empêcher les impatients de cliquer partout pendant le process !)
            app.dialog.preloader();
          },
          success: function (res) {
            // res correspond à la réponse
            //console.log(res.meals);
            res.meals.forEach(meal => {
              //console.log(meal);
              $('.categorie-name').html(categorieId);

              $('.categorie-list').append(`<li>
              <a href="/recette/${meal.idMeal}/" class="item-link item-content recette-link">
                <div class="item-media"><img src="${meal.strMealThumb}" width="100" /></div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title"> ${meal.strMeal} </div>
                  </div>
                </div>
              </a>
            </li>`)
              
            });
            // Je ferme le loader
            app.dialog.close();
          },
        });
      }
    }
  },

  {
    path: '/settings/',
    url: './pages/settings.html',
  },

  {
    path: '/catalog/',
    url: "./pages/catalog.html",
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
            //console.log(res.categories);
            res.categories.forEach(categorie => {
              //console.log(categorie);
                 
              $('.catalog-list').append(`<li>
              <a href="/categories/${categorie.strCategory}/" class="item-link item-content">
                <div class="item-media"><img src="${categorie.strCategoryThumb}" width="100" /></div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">${categorie.strCategory}</div>
                  </div>
                  <div class="item-text"> ${categorie.strCategoryDescription} </div>
                </div>
              </a>
            </li> `)

              
            });
            // Je ferme le loader
            app.dialog.close();
          },
        });
      }
    }
  },
  
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
