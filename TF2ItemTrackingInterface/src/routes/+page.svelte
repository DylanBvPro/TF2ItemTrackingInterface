<script>
  //import TopAnimation from './topanimation.svelte'; // Adjust the path as needed
  let inputSubmitValue = '';
  let price = 0;

  const submitValue = () => {
    // Validate the form inputs
    if (!inputValue || price <= 0) {
        alert('Please fill in all fields correctly.');
        return;
    }

    // Log the values for now (you can replace this with your logic)
    console.log(`Item Name: ${inputValue}, Price: ${price} is submitted!`);

    // Reset the form inputs after submission
    inputValue = '';
    price = 0;

    // Optionally, close the modal
    showModal = false;

    // Clear the input focus
    searchInput.focus();
};

    import { onMount } from 'svelte';
    import { itemImageMap } from './items.js'; // Adjust the path as necessary

    let items = [];
    let reitems = [];
    let faitems = [];
    let usitems = [];
    let chartData = [];
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

    async function fetchUserItems() {
        const response = await fetch('src/lib/data/itemCategory.json'); // Path to the recent items JSON
        const data = await response.json();
        return data.userSection;
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
        //console.log(reitems);
    }

    
    async function displayUserItems() {
        const allItems = await fetchItemData();
        const itemValues = await fetchItemValues();
        const userItems = await fetchUserItems();

        usitems = userItems.map(userItem => {
            const foundItem = userItems.find(item => item.name === userItem.name);
            if (foundItem) {
                return {
                    ...foundItem,
                    quantity: userItems[foundItem.number],
                    price: userItems[foundItem.bought],
                    goingprice: itemValues[foundItem.name],
                    pictureID: itemImageMap[foundItem.name] || 'src/lib/assets/defaultImage.png' // Fallback image
                };
            }
            return null;
        }).filter(item => item !== null); // Filter out any nulls in case of missing items
        console.log(usitems);
    }
    onMount(() => {
        displayRandomItems();
        displayRecentItems();
        displayUserItems();
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

<nav>
    <ul>
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="/inventory">Your Inventory</a>
        </li>
    </ul>
</nav>

<body>

  <div class="marquee-container">
    <div class="marquee">
      <div class="section yellow">:: WARNING: This Is A Demo ::</div>
      <div class="section gray">:: WARNING: This Is A Demo ::</div>
      <div class="section yellow">:: WARNING: This Is A Demo ::</div>
      <div class="section gray">:: WARNING: This Is A Demo ::</div>
      <div class="section yellow">:: WARNING: This Is A Demo ::</div>
    </div>
  </div>

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
          <div class="itemBoxPrice" id={`itemPriceID${index + 1}`}>
            ${item.price[item.price.length - 1]} 
            {#if item.price.length >= 30}
              <span class="percentageChange" 
                    style="color: {(((item.price[item.price.length - 1] - item.price[item.price.length - 30]) / item.price[item.price.length - 30]) * 100) > 0 ? 'green' : 'red'};">
                ({(((item.price[item.price.length - 1] - item.price[item.price.length - 30]) / item.price[item.price.length - 30]) * 100).toFixed(2)}%)
              </span>
            {/if}
          </div>
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
          <div class="itemBoxPrice" id="itemPriceID">
            ${item.price[item.price.length - 1]} 
            {#if item.price.length >= 30}<span class="percentageChange" 
            style="color: {(((item.price[item.price.length - 1] - item.price[item.price.length - 30]) / item.price[item.price.length - 30]) * 100) > 0 ? 'green' : 'red'};">
        ({(((item.price[item.price.length - 1] - item.price[item.price.length - 30]) / item.price[item.price.length - 30]) * 100).toFixed(2)}%)
      </span>
            {/if}
          </div>
      </div>
        {/each}

      
      </div>
      <p></p>
       <!--
       <h1 class="titleContainer">Favorite Items</h1>
       <div class = "boxRow" id = "favorite">
        {#each faitems as item, index}
        <div class="boxType" id={`boxTrendingID${index + 1}`}>
          <div class="itemBoxQuantity" id={`itemQuantityID${index + 1}`}>{item.number}</div>
          <div class="itemBoxPicture" id={`itemPictureID${index + 1}`}>
            <img src={item.pictureID} alt={"broke"} /></div>
          <div class="itemBoxName" id={`itemBoxID${index + 1}`}>{item.name}</div>
          <div class="itemBoxPrice" id={`itemPriceID${index + 1}`}>${item.price[item.price.length - 1]} 
            <span class="percentageChange">(Change: {(((item.price[item.price.length - 1] - item.price[item.price.length - 30]) / item.price[item.price.length - 30]) * 100)}%)</span>
          </div>
        </div>
      {/each}
    </div>
    ...-->
    <p></p>
    <!--...-->
    <h1 class="titleContainer">Your Items</h1>
    <div class = "boxRow" id = "user">
     {#each usitems as item, index}
     <div class="boxType" id={`boxUserID${index + 1}`}>
       <div class="itemBoxQuantity" id={`itemQuantityID${index + 1}`}>{item.number}</div>
       <div class="itemBoxPicture" id={`itemPictureID${index + 1}`}>
         <img src={item.pictureID} alt={"broke"} /></div>
       <div class="itemBoxName" id={`itemBoxID${index + 1}`}>{item.name}</div>
       <div class="itemBoxPrice" id={`itemPriceID${index + 1}`}>
        ${item.goingprice.length - 1} 
        <span class="percentageChange" 
              style="color: {(((item.goingprice[item.goingprice.length - 1] - item.bought) / item.bought) * 100) > 0 ? 'green' : 'red'};">
          ({(((item.goingprice[item.goingprice.length - 1] - item.bought) / item.bought) * 100).toFixed(2)}%)
        </span>
        <div>Your Price ${item.bought}</div>
      </div>
     </div>
   {/each}
 </div>

<h2>
  <div class="bottomContainer">
    <div id="graphMenu">
    </div>
    <div id="addItems">
      <button on:click={() => (showModal = true)} class="add-item-button">Add Items</button>
    </div>
  </div>
</h2>

</h1>


<Modal bind:showModal>
  <h2 slot="header">
    Modal
    <small><em>adjective</em> mod·al \ˈmō-dəl\</small>
  </h2>
  
  <div>
    <img id="itemImage" src="src/lib/assets/default.png" alt="Default Image" width="200" />
  </div>
  
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
           required
           bind:value={price}>
  </form>
  
  <div class="modal-footer">
    <button class="submit-button" on:click={submitValue}>Submit</button>
    <button class="close-button" on:click={() => showModal = false}>Close</button>
  </div>

  <a href="https://www.merriam-webster.com/dictionary/modal" target="_blank">
    Merriam-Webster: Definition of Modal
  </a>
</Modal>


</body>





<style>

  /* General Styles */
  body {
    font-family: Arial, sans-serif;
  }
  
  .percentageChange {
    font-weight: bold;
  }
  
  .positive {
    color: green;
  }
  
  .negative {
    color: red;
  }
  
  /* Modal Styles */
  .modal-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
  
  .submit-button {
    align-self: flex-start; /* Align to bottom left */
  }
  
  .close-button {
    align-self: flex-end; /* Align to bottom right */
  }
  
  /* Autocomplete Styles */
  div.autocomplete {
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
  
  /* Generated Text Styles */
  .GeneratedText {
    font-family: 'Arial Black', sans-serif;
    font-size: 2em;
    font-stretch: normal;
    text-decoration: underline;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    line-height: 1.3em;
    color: #FFD700;
    padding: 1.5em;
    margin: auto;
  }
  
  /* Button Styles */
  .add-item-button {
    background-color: #233d4d;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 30px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
  }

  .bottomContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh; /* Adjust as needed */
  }
  
  /* Background Styles */
  .toplogo {
    background-color: #233d4d;
            display: center;
            justify-content: center;
            align-items: center;
            margin: 0;
            color: white;
            text-align: center;
  }
  
  .majorBackground {
    background: linear-gradient(to bottom, #233d4d, #416e81);
  }
  
  /* Title Container Styles */
  .titleContainer {
    background-color: #2a475e;
    padding: 20px;
    text-align: center;
    width: 40%;
    margin: 0 auto;
    border-radius: 15px;
    color: #f2ae31;
    border: 10px solid; /* Fallback for browsers that do not support border-image */
    
  }
  
  /* Item Box Styles */
  .itemBoxPicture {
    justify-content: center;
    align-items: center;
    height: 200px; /* Adjust as needed */
    width: 200px; /* Adjust as needed */
  }
  
  .itemBoxPicture img {
    max-width: 200px;
    max-height: 200px;
    object-fit: contain; /* Ensures the image maintains its aspect ratio */
  }
  
  /* Navigation Styles */
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
  
  /* Box Row Styles */
  .boxRow {
    display: flex;
    justify-content: space-between;
    margin: 0 10%; /* 10% offset from the edge */
    background-color: #1b2838; /* Light grey background */
    border-radius: 10px; /* Rounded corners */
    padding: 20px; /* Padding inside the box */
    font-size: 16px; /* Font size */
    color: #333; /* Text color */
  }
  
  .boxType {
    background-color: #2a475e; /* Light blue background */
    border-radius: 10px; /* Rounded corners */
    margin: 0 1%; /* 10% offset on both sides */
    padding: 20px; /* Padding inside the box */
    font-size: 16px; /* Font size */
    color: #c7d5e0; /* Text color */
  }
  
  .boxType:last-child {
    margin-right: 0; /* Remove margin from the last box */
  }
  
  /* Item Box Quantity and Name Styles */
  .itemBoxQuaintity {
    top: 0;
    left: 0;
    color: #c7d5e0;
    font-size: small;
  }
  
  .itemBoxName, .itemBoxPrice {
    text-align: center;
    margin-top: 10px;
  }

  .marquee-container {
    position: fixed; /* Fix the position */
    top: 0; /* Align to the top */
    left: 0; /* Start from the left */
    right: 0; /* Stretch to the right */
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    font-size: 2em; /* Adjust size here */
    color: #FFD700; /* Bold yellow */
    font-family: Verdana;
    font-weight: bold; /* Bold text */
    padding: 10px; /* Padding for better appearance */
    z-index: 1000; /* Ensure it's above other content */
  }

  .marquee {
    display: inline-block; /* Allow horizontal scrolling */
    animation: scroll 10s linear infinite;
  }

  .section {
    display: inline-block; /* Display sections inline */
    padding: 10px; /* Padding for better appearance */
    margin: 0; /* Remove margins */
  }

  .yellow {
    background-color: rgba(255, 255, 0, 0.5); /* Translucent yellow */
  }

  @keyframes scroll {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  </style>
  