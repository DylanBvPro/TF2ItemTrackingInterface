
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

<div class = toplogo style="text-align: center;">
  <div class="GeneratedText">TF2 Item Tracker</div>
  <img src="src\lib\assets\default.png" alt="defaultImage" />
</div>

<h1 class="majorBackground">
  <div id="itemContainer">
    <div id="background">
      <h1 class="titleContainer">Trending Items</h1>
      <div class = "boxRow" id = "trending">
        {#each items as item, index}
        <div class="boxType" id={`boxTrendingID${index + 1}`}>
          <div class="itemBoxQuantity" id={`itemQuantityID${index + 1}`}>{item.number}</div>
          <div class="itemBoxPicture" id={`itemPictureID${index + 1}`}>
            <img src={item.pictureID} alt={"broke"} /></div>
          <div class="itemBoxName" id={`itemBoxID${index + 1}`}>{item.name}</div>
          <div class="itemBoxPrice" id={`itemPriceID${index + 1}`}>${item.price[item.price.length - 1]}</div>
      </div>
      {/each}

      </div>
      
      <p></p>
      <h1 class="titleContainer">Recent Items</h1>
      <div class = "boxRow" id = "recent">
        {#each reitems as item}
        <div class="boxType" id="boxRecentID">
          <div class="itemBoxQuantity" id="itemQuantityID">{item.number || 0}</div>
          <div class="itemBoxPicture" id="itemPictureID">
              <img src={item.pictureID} alt={item.name} />
          </div>
          <div class="itemBoxName" id="itemBoxID">{item.name}</div>
          <div class="itemBoxPrice" id="itemPriceID">${item.price[item.price.length - 1]}</div>
      </div>
        {/each}

      
      </div>
      <p></p>
       <!--...-->
       <h1 class="titleContainer">Favorite Items</h1>
       <div class = "boxRow" id = "favorite">
       <div class = "boxType" id = "boxfavoriteID">
        <div class = "itemBoxQuaintity" id = "itemQuaintityID"></div>
        <div class = "itemBoxPicture" id = "itemPictureID"></div>
        <div class = "itemBoxName" id = "itemBoxID"></div>
        <div class = "itemBoxPrice" id = "itemPriceID"></div>
      </div>
    </div>

  </div>
</h1>

<h2>
  <div class="bottomContainer">
    <div id="graphMenu">
    </div>
    <div id="addItems">
      <button class="add-item-button">Add Items</button>
    </div>
  </div>
</h2>

<button on:click={() => (showModal = true)}> show modal </button>

<Modal bind:showModal>

  <h2 slot="header">
    Modal
    <small><em>adjective</em> mod·al \ˈmō-dəl\</small>
  </h2>
  
  <div>
    <img id="itemImage" src="src/lib/assets/default.png" alt="Default Image" width="200" />
  </div>
  
  <!-- <svelte:window on:keydown={navigateList} /> -->
  
  <label for="itemAdd">Enter the item you want to track:</label>
  
  <form autocomplete="on">
    <div class="autocomplete">
      <input id="itemInput" 
             type="text" 
             placeholder="Item Name" 
             bind:this={searchInput} 
             bind:value={inputValue} 
             on:input={filterCountries}>
    </div>
    
    <!-- Filtered List of Items -->
    {#if filteredCountries.length > 0}
      <ul id="autocomplete-items-list">
        {#each filteredCountries as itemName, i}
          <TF2Item itemLabel={itemName} 
                   highlighted={i === hiLiteIndex} 
                   on:click={() => setInputVal(itemName)} />
        {/each}
      </ul>
    {/if}
  
    <br>
  
    <label for="price">Enter the price you purchased it at:</label>
    <input type="number" 
           id="price" 
           placeholder="Enter Price" 
           step="0.01" 
           min="0" 
           required>
  </form>
  
  <a href="https://www.merriam-webster.com/dictionary/modal" target="_blank">
    Merriam-Webster: Definition of Modal
  </a>

</Modal>





<script>
//   document.addEventListener('DOMContentLoaded', function() {
//       function checkAndSetDefaultText() {
//           // Object containing default texts for each pattern
//           var defaultTexts = {
//               'itemQuaintityID': '0',
//               'itemPictureID': 'src/lib/assets/default.png',
//               'itemBoxID': '#####',
//               'itemPriceID': '$0.00'
//           };
  
//  //         var defaultImage = "src/lib/assets/default.png";

//  //         var itemPictureID = document.getElementById("itemPictureID");
//  //       itemPictureID.innerHTML = `<img src="${defaultImage}" alt="Default Image" />`;

// //        itemPictureID.classList.add('itemBoxPicture');

//           // Array of ID patterns to check
//           var idPatterns = Object.keys(defaultTexts);
  
//           idPatterns.forEach(function(pattern) {
//               // Get all elements with IDs containing the pattern
//               var elements = document.querySelectorAll('[id*="' + pattern + '"]');
  
//               elements.forEach(function(el) {
//                   // Check if the ID ends with .#
//                   var id = el.id;
//                   var regex = new RegExp(pattern + '\\.\\d+$');
  
//                   if (!regex.test(id)) {
//                       // If the ID doesn't end with .#, set the default text
//                       el.textContent = defaultTexts[pattern];
//                   }
//               });
//           });
//       }
  
//       // Call the function to check IDs and set default text
//       checkAndSetDefaultText();
//   });

  /////


      // async function fetchData(file) {
      //       const response = await fetch(file);
      //       if (!response.ok) {
      //           throw new Error('Network response was not ok');
      //       }
      //       return await response.json();
      //   }

      //   function getRandomEntry(data) {
      //       const randomIndex = Math.floor(Math.random() * data.length);
      //       return data[randomIndex];
      //   }

      //   async function autoFill() {
      //       try {
      //           const data = await fetchData('src/lib/data/itemData.json');
      //           const randomEntry = getRandomEntry(data);

      //           document.getElementById('itemName').value = randomEntry.name;
      //           document.getElementById('itemValue').value = randomEntry.number;

      //       } catch (error) {
      //           console.error('Error fetching data:', error);
      //       }
      //   }

      //   window.onload = autoFill;

      import { onMount } from 'svelte';
    import { itemImageMap } from './items.js'; // Adjust the path as necessary

    let items = [];
    let reitems = [];
    let lastValue;

    async function fetchItemData() {
        const response = await fetch('src/lib/data/itemData.json');
        const data = await response.json();
        return data;
    }

    async function fetchItemValues() {
      const response = await fetch('src/lib/data/itemValue.json');
      const values = await response.json();
      return values;
    }

    async function fetchRecentItems() {
        const response = await fetch('src/lib/data/itemCategory.json'); // Path to the recent items JSON
        const data = await response.json();
        return data.recentSection;
    }

    async function displayRandomItems() {
        const allItems = await fetchItemData();
        const itemValues = await fetchItemValues();
        const randomItems = [];
        const itemCount = 5; // Change this for more boxes

        while (randomItems.length < itemCount) {
            const randomIndex = Math.floor(Math.random() * allItems.length);
            const randomItem = allItems[randomIndex];

            // Avoid duplicates
            if (!randomItems.includes(randomItem)) {
                const lastValue = itemValues[itemValues.length - 1];
                randomItems.push(randomItem);
                
            }
        }

        // Update items to include image paths
        items = randomItems.map(item => ({
            ...item,
            price: itemValues[item.name],
            pictureID: itemImageMap[item.name] || 'src/lib/assets/defaultImage.png' // Fallback image

        }));
    }

    async function displayRecentItems() {
        const allItems = await fetchItemData();
        const itemValues = await fetchItemValues();
        const recentItems = await fetchRecentItems();

        reitems = recentItems.map(recentItem => {
            const foundItem = allItems.find(item => item.name === recentItem.name);
            if (foundItem) {
                return {
                    ...foundItem,
                    quantity: itemValues[foundItem.number],
                    price: itemValues[foundItem.name],
                    pictureID: itemImageMap[foundItem.name] || 'src/lib/assets/defaultImage.png' // Fallback image
                };
            }
            return null;
        }).filter(item => item !== null); // Filter out any nulls in case of missing items
    }

    onMount(() => {
        displayRandomItems();
        displayRecentItems();
    });

// Call the function to display random items on page load

  /////
    
  //import defaultImage from 'lib/assets/default.png'
	import Modal from './Modal.svelte';

	let showModal = false;

  import { itemNames } from './items.js';
import TF2Item from './Country.svelte';	
	
	
/* FILTERING countres DATA BASED ON INPUT */	
let filteredCountries = [];
// $: console.log(filteredCountries)	

const filterCountries = () => {
	let storageArr = []
	if (inputValue) {
		itemNames.forEach(itemName => {
			 if (itemName.toLowerCase().startsWith(inputValue.toLowerCase())) {
				 storageArr = [...storageArr, makeMatchBold(itemName)];
			 }
		});
	}
	filteredCountries = storageArr;
}	


/* HANDLING THE INPUT */
let searchInput; // use with bind:this to focus element
let inputValue = "";
	
$: if (!inputValue) {
	filteredCountries = [];
	hiLiteIndex = null;
}

const clearInput = () => {
	inputValue = "";	
	searchInput.focus();
}
	
const setInputVal = (countryName) => {
	inputValue = removeBold(countryName);
	filteredCountries = [];
	hiLiteIndex = null;
  $: console.log(countryName);
  $: console.log(inputValue);
	//document.querySelector('#itemName-input').focus();
  filterItemsImage();

}	

const submitValue = () => {
	if (inputValue) {
		console.log(`${inputValue} is submitted!`);
		setTimeout(clearInput, 1000);
	} else {
		alert("You didn't type anything.")
	}
}

const makeMatchBold = (str) => {
	// replace part of (country name === inputValue) with strong tags
	let matched = str.substring(0, inputValue.length);
	let makeBold = `<strong>${matched}</strong>`;
	let boldedMatch = str.replace(matched, makeBold);
	return boldedMatch;
}

const removeBold = (str) => {
	//replace < and > all characters between
	return str.replace(/<(.)*?>/g, "");
	// return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
}	
	

/* NAVIGATING OVER THE LIST OF COUNTRIES W HIGHLIGHTING */	
let hiLiteIndex = null;
$: console.log(hiLiteIndex);	
$: hiLitedCountry = filteredCountries[hiLiteIndex]; 	
	
const navigateList = (e) => {
	if (e.key === "ArrowDown" && hiLiteIndex <= filteredCountries.length-1) {
		hiLiteIndex === null ? hiLiteIndex = 0 : hiLiteIndex += 1
	} else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
		hiLiteIndex === 0 ? hiLiteIndex = filteredCountries.length-1 : hiLiteIndex -= 1
	} else if (e.key === "Enter") {
		setInputVal(filteredCountries[hiLiteIndex]);
	} else {
		return;
	}
} 


////////////////////////////////

//import { itemImageMap } from './items.js';  // Import the image map from items.js

const itemInput = document.getElementById('itemInput');
const autocompleteList = document.getElementById('autocomplete-list');

// Filter the items based on input
function filterItemsImage() {
    $: console.log(inputValue);
    const query = String(inputValue).toLowerCase();
    $: console.log("Test");
    //autocompleteList.innerHTML = ''; // Clear previous results
    // Get matching items from the itemImageMap
    const filteredItems = Object.keys(itemImageMap).filter(item => 
        item.toLowerCase().includes(query)
        
    );
    selectItem(inputValue);
}

// When an item is selected from the autocomplete list
function selectItem(item) {
    const imageSrc = itemImageMap[item] || '../assets/default.png'; // Get the corresponding image
    const itemImageUpdate = document.getElementById('itemImage');
    $: console.log(imageSrc)
    itemImageUpdate.src = imageSrc; // Update the image source
    $: console.log("Updated Image");
}

// Add event listener to the input field to trigger filtering
//itemInput.addEventListener('input', filterItemsImage);

  </script>


<style>

div.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
	width: 300px;
}
input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
	margin: 0;
}
input[type=text] {
  background-color: #f1f1f1;
  width: 100%;
}
input[type=submit] {
  background-color: DodgerBlue;
  color: #fff;
}
	
#autocomplete-items-list {
	position: relative;
	margin: 0;
	padding: 0;
	top: 0;
	width: 297px;
	border: 1px solid #ddd;
	background-color: #ddd;
}


.GeneratedText {
font-family:'Arial Black', sans-serif;font-size:2em;font-stretch:normal;text-decoration:underline;text-transform:uppercase;letter-spacing:0.2em;line-height:1.3em;color:#FFD700;padding:1.5em;margin:auto;
}

.bottomContainer{
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-item-button {
  background: linear-gradient(to right, #add8e6, #266085);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
}

.toplogo{
  background-image: url('https://wallpapers.com/images/hd/tf2-logo-nep69rdezxywcuv1.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.majorBackground {
  background: linear-gradient(to bottom, #2a475e, #000033);
}

.titleContainer {
    background-color: #2a475e;
    padding: 20px;
    text-align: center;
    width: 40%;
    margin: 0 auto;
    border-radius: 15px;
    color: #c7d5e0;
    border: 10px solid; /* Fallback for browsers that do not support border-image */
    border-image: url('https://wallpapers.com/images/hd/tf2-logo-8y06eilcwlrinyyx.jpg') 30 round; /* Adjust the slice value and repeat style as needed */
}

.itemBoxPicture {

  justify-content: center;
  align-items: center;
  height: 200; /* Adjust as needed */
  width: 200; /* Adjust as needed */
}

.itemBoxPicture img {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain; /* Ensures the image maintains its aspect ratio */
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
      color: #c7d5e0;
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
      background-color: #1b2838;; /* Light grey background */
      border-radius: 10px;       /* Rounded corners */
      padding: 20px;             /* Padding inside the box */
      font-family: Arial, sans-serif; /* Font style */
      font-size: 16px;           /* Font size */
      color: #333;               /* Text color */
    }
    
    .boxType {
      background-color: #2a475e; /* Light blue background */
      border-radius: 10px;       /* Rounded corners */
      margin: 0 1%;             /* 10% offset on both sides */
      padding: 20px;             /* Padding inside the box */
      font-family: Arial, sans-serif; /* Font style */
      font-size: 16px;           /* Font size */
      color: #c7d5e0;               /* Text color */
    }
    .boxType:last-child {
      margin-right: 0; /* Remove margin from the last box */
    }
    
    .itemBoxQuaintity {
    top: 0;
    left: 0;
    color: c7d5e0;
    font-size: small;
  }


  .itemBoxName, .itemBoxPrice {
    text-align: center;
    margin-top: 10px;
  }
  </style>

  