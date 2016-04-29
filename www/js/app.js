
var db = null;
var tt = angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //db starts from here
    db = $cordovaSQLite.openDB({name:"tt.db", location:'default'});
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS player1 (pid INTEGER PRIMARY KEY AUTOINCREMENT, p1name TEXT,p1set1 text,p1set2 text,p1set3 text,p1set4 text,p1set5 text)');
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS player2 (pid INTEGER PRIMARY KEY AUTOINCREMENT, p2name TEXT,p2set1 text,p2set2 text,p2set3 text,p2set4 text,p2set5 text)');
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS match (id INTEGER PRIMARY KEY AUTOINCREMENT, player1 INTEGER,player2 INTEGER,FOREIGN KEY(player1) REFERENCES player1(pid),FOREIGN KEY(player2) REFERENCES player2(pid))');
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.score', {
    url: '/score',

    views: {
      'menuContent': {
        templateUrl: 'templates/score.html',
        controller: 'ScoreCtrl'
        
      }
    }
  })

  .state('app.recent', {
      url: '/recent',
      views: {
        'menuContent': {
          templateUrl: 'templates/recent.html',
          controller: 'StoreCtrl'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }

  })
  .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html',
          //controller: 'PlaylistsCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/score');
});