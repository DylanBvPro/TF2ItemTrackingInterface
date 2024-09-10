<script>
  document.addEventListener('DOMContentLoaded', function() {
      function checkAndSetDefaultText() {
          // Object containing default texts for each pattern
          var defaultTexts = {
              'itemQuaintityID': '0',
              'itemPictureID': 'src/lib/assets/default.png',
              'itemBoxID': '#####',
              'itemPriceID': '$0.00'
          };
  
 //         var defaultImage = "src/lib/assets/default.png";

 //         var itemPictureID = document.getElementById("itemPictureID");
 //       itemPictureID.innerHTML = `<img src="${defaultImage}" alt="Default Image" />`;

//        itemPictureID.classList.add('itemBoxPicture');

          // Array of ID patterns to check
          var idPatterns = Object.keys(defaultTexts);
  
          idPatterns.forEach(function(pattern) {
              // Get all elements with IDs containing the pattern
              var elements = document.querySelectorAll('[id*="' + pattern + '"]');
  
              elements.forEach(function(el) {
                  // Check if the ID ends with .#
                  var id = el.id;
                  var regex = new RegExp(pattern + '\\.\\d+$');
  
                  if (!regex.test(id)) {
                      // If the ID doesn't end with .#, set the default text
                      el.textContent = defaultTexts[pattern];
                  }
              });
          });
      }
  
      // Call the function to check IDs and set default text
      checkAndSetDefaultText();
  });
    
  //import defaultImage from 'lib/assets/default.png'
  </script>

<nav>
    <ul>
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="/inventory">Inventory</a>
        </li>
    </ul>
</nav>
<img src="src\lib\assets\default.png" alt="defaultImage" />
<h1>
  <div id="itemContainer">
    <div id="background">
      <h1 class="titleContainer">Trending Items</h1>
      <div class = "boxRow" id = "trending">
        <div class = "boxType" id = "boxTrendingID">
          <div class = "itemBoxQuaintity" id = "itemQuaintityID"></div>
          <div class = "itemBoxPicture" id = "itemPictureID"></div>
          <div class = "itemBoxName" id = "itemBoxID"></div>
          <div class = "itemBoxPrice" id = "itemPriceID"></div>
        </div>
        <!--...-->
        <div class = "boxType" id = "boxTrendingID">
          <div class = "itemBoxQuaintity" id = "itemQuaintityID">
          </div>
          <div class = "itemBoxPicture" id = "itemPictureID"></div>
          <div class = "itemBoxName" id = "itemBoxID"></div>
          <div class = "itemBoxPrice" id = "itemPriceID"></div>
        </div>
        <!--...-->
        <div class = "boxType" id = "boxTrendingID">
          <div class = "itemBoxQuaintity" id = "itemQuaintityID"></div>
          <div class = "itemBoxPicture" id = "itemPictureID"></div>
          <div class = "itemBoxName" id = "itemBoxID"></div>
          <div class = "itemBoxPrice" id = "itemPriceID"></div>
        </div>
      </div>
      
      <p></p>
      <h1 class="titleContainer">Recent Items</h1>
      <div class = "boxRow" id = "recent">
        <div class = "boxType" id = "boxRecentID">
          <div class = "itemBoxQuaintity" id = "itemQuaintityID"></div>
          <div class = "itemBoxPicture" id = "itemPictureID"></div>
          <div class = "itemBoxName" id = "itemBoxID"></div>
          <div class = "itemBoxPrice" id = "itemPriceID"></div>
        </div>
        <!--...-->
        <div class = "boxType" id = "boxRecentID">
          <div class = "itemBoxQuaintity" id = "itemQuaintityID"></div>
          <div class = "itemBoxPicture" id = "itemPictureID"></div>
          <div class = "itemBoxName" id = "itemBoxID"></div>
          <div class = "itemBoxPrice" id = "itemPriceID"></div>
        </div>
        <!--...-->
        <div class = "boxType" id = "boxRecentID">
          <div class = "itemBoxQuaintity" id = "itemQuaintityID"></div>
          <div class = "itemBoxPicture" id = "itemPictureID"></div>
          <div class = "itemBoxName" id = "itemBoxID"></div>
          <div class = "itemBoxPrice" id = "itemPriceID"></div>
        </div>
      </div>

      <p></p>
      <h1 class="titleContainer">Favorite Items</h1>
      <div class = "boxRow" id = "Favorite">
        <div class = "boxType" id = "boxFavoriteID">
          <div class = "itemBoxQuaintity" id = "itemQuaintityID"></div>
          <div class = "itemBoxPicture" id = "itemPictureID"></div>
          <div class = "itemBoxName" id = "itemBoxID"></div>
          <div class = "itemBoxPrice" id = "itemPriceID"></div>
        </div>
        <!--...-->
        <div class = "boxType" id = "boxTrendingID">
          <div class = "itemBoxQuaintity" id = "itemQuaintityID">
          </div>
          <div class = "itemBoxPicture" id = "itemPictureID"></div>
          <div class = "itemBoxName" id = "itemBoxID"></div>
          <div class = "itemBoxPrice" id = "itemPriceID"></div>
        </div>
        <!--...-->
        <div class = "boxType" id = "boxTrendingID">
          <div class = "itemBoxQuaintity" id = "itemQuaintityID"></div>
          <div class = "itemBoxPicture" id = "itemPictureID"></div>
          <div class = "itemBoxName" id = "itemBoxID"></div>
          <div class = "itemBoxPrice" id = "itemPriceID"></div>
        </div>
      </div>
  </div>
</h1>

<h2>
  <div id="bottomContainer">
    <div id="graphMenu">

    </div>
    <div id="addItems">
    
    </div>
  </div>
</h2>

<style>

.titleContainer {
    background-color: lightgrey;
    padding: 20px;
    text-align: center;
}

.itemBoxPicture {
    background-image: url('default.png');
    background-size: cover; /* Ensure the image covers the entire div */
    background-position: center; /* Center the image */
}

    nav {
      background-color: #333;
      padding: 1em;
    }
  
    nav ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-between;
    }
  
    nav ul li a {
      color: white;
      text-decoration: none;
      padding: 0.5em 1em;
      display: block;
    }
  
    nav ul li a:hover {
      background-color: #575757;
    }

    .boxRow {
      display: flex;
      justify-content: space-between;
      margin: 0 10%; /* 10% offset from the edge */
      background-color: #f0f0f0; /* Light grey background */
      border-radius: 10px;       /* Rounded corners */
      padding: 20px;             /* Padding inside the box */
      font-family: Arial, sans-serif; /* Font style */
      font-size: 16px;           /* Font size */
      color: #333;               /* Text color */
    }
    
    .boxType {
      background-color: #00adee; /* Light blue background */
      border-radius: 10px;       /* Rounded corners */
      margin: 0 1%;             /* 10% offset on both sides */
      padding: 20px;             /* Padding inside the box */
      font-family: Arial, sans-serif; /* Font style */
      font-size: 16px;           /* Font size */
      color: #333;               /* Text color */
    }
    .boxType:last-child {
      margin-right: 0; /* Remove margin from the last box */
    }
    
    .itemBoxQuaintity {
    top: 0;
    left: 0;
    color: white;
    font-size: small;
  }


  .itemBoxName, .itemBoxPrice {
    text-align: center;
    margin-top: 10px;
  }
  </style>

  