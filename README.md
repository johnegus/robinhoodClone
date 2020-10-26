# robinhoodClone

MVP

    Dashboard + Portfolio
    Asset/Stock Detail
    Watchlist
    Asset/Stock Search

User authentication

    Sign Up
    Login / Logout
    Demo User Login

Front-end:

    React
    Redux
    Hooks are optional (but encouraged)

Backend:

    Express
    Sequelize
    
Backend Routes:
    Users (user account management)
    - POST /api/users
    - POST /api/users/token
    
    Positions (shares at purchase price)
    - POST /api/positions (purchase positions)
    - GET /api/positions/ (get entire portfolio of positions for display in sidebar)
    - DELETE /api/positions/:id (sell entire position)
    - PATCH /api/positions/:id (sell some shares but not entire position)
    
    Watchlist (just bookmarked assets)
    - POST /api/bookmarks (add bookmarked asset to watchlist)
    - GET /api/bookmarks/ (get watchlist for display in sidebar)
    - DELETE /api/bookmarks/:id (delete bookmarked asset)
    
    
Hopeful Bonus features:

    Market News
    Unusual Market Activity
    
* [Feature List](/documentation/featureList.md)
* [MVP](/documentation/MVP.md)
* [Front End Routes](/documentation/frontEndRoutes.md)
* [Back End Routes](/documentation/backEndRoutes.md)
* [Schema](/documentation/schema.md)
* [Schema Image](/documentation/schema-diagram.png)
* [Templates List](/documentation/templatesList.md)
