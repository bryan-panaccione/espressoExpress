export function add() {
  return `
    <h3>Add a Pet</h3>
              <div class="petAddOptions adminLayout">
                <div class="adminInPiece">
                  <label for="name">Name</label>
                  <input type="text" name="name" id="petAddName" class="shortInput">
                </div>                
                <div class="adminInPiece">
                  <label for="age">Age</label>
                  <input type="text" name="age" id="petAddAge" class="shortInput">
                </div>                
                <div class="adminInPiece">
                  <label for="breed">Breed</label>
                  <input type="text" name="breed" id="petAddBreed" class="shortInput">
                </div>                
                <div class="adminInPiece">
                  <label for="kind2">Type</label>
                  <select name="kind2" class="petAddKind">
                    <option value="null" selected="selected" ></option>
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    <option value="reptile">Reptile</option>
                    <option value="critter">Critter</option>
                  </select>
                </div>
                <div class="adminInPiece">
                  <label for="checkPetAniAdd">Animal Friendly?</label>
                  <input type="checkbox" name="checkPetAniAdd" id="petAddAni">
                </div>
                <div class="adminInPiece">
                  <label for="checkPetKidAdd">Kid Friendly?</label>
                  <input type="checkbox" name="checkPetKidAdd" id="petAddKid">
                </div>
                <div class="adminInPiece">
                  <label for="checkPetVaxAdd">Vaccinated?</label>
                  <input type="checkbox" name="checkPetVaxAdd" id="petAddVax">
                </div>
              </div>
              <div class="adminInPiece">
              <textarea class="longInput" rows="10" cols="30">Enter pet biography</textarea>
              </div>
              <ul class="actions adminInPiece">
                <button id="addtoDB" class="button alt special">Add Pet</button>
                <button id="resetAddOpts" class="button alt">Reset</button>
        
            
              </ul>
                `;
}

export function update() {
  return `
                <div class="changeHeader">
                  <h3>Select Pet to Update</h3>
                  <input type="text" class="shortInput updateIDpatch" placeholder="Pet ID">
                  <button class="button special" id="getPet">Get Pet</button>
                </div>

              <div class="petAddOptions adminLayout">
                <div class="adminInPiece">
                  <label for="name">Name</label>
                  <input type="text" name="name" id="petAddName" class="shortInput">
                </div>                
                <div class="adminInPiece">
                  <label for="age">Age</label>
                  <input type="text" name="age" id="petAddAge" class="shortInput">
                </div>                
                <div class="adminInPiece">
                  <label for="breed">Breed</label>
                  <input type="text" name="breed" id="petAddBreed" class="shortInput">
                </div>                
                <div class="adminInPiece">
                  <label for="kind2">Type</label>
                  <select name="kind2" class="petAddKind">
                    <option value="null" selected="selected" ></option>
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    <option value="reptile">Reptile</option>
                    <option value="critter">Critter</option>
                  </select>
                </div>
                <div class="adminInPiece">
                  <label for="checkPetAniAdd">Animal Friendly?</label>
                  <input type="checkbox" name="checkPetAniAdd" id="petAddAni">
                </div>
                <div class="adminInPiece">
                  <label for="checkPetKidAdd">Kid Friendly?</label>
                  <input type="checkbox" name="checkPetKidAdd" id="petAddKid">
                </div>
                <div class="adminInPiece">
                  <label for="checkPetVaxAdd">Vaccinated?</label>
                  <input type="checkbox" name="checkPetVaxAdd" id="petAddVax">
                </div>
                <div class="adminInPiece">
                <label id="patchingIDDisp">_</label>
              </div>
              </div>
              <div class="adminInPiece">
                <textarea class="longInput" id="petAddAbout"rows="10" cols="30">

                  </textarea>
              </div>
              <ul class="actions adminInPiece">
              <button id="updateDB" class="button alt special">Send Update</button>
              <button id="resetAddOpts" class="button alt">Reset</button>

              </ul>
        `;
}

export function deleter() {
  return `
    <div class="changeHeader">
        <h3>Select Pet to Remove</h3>
        <input type="text" class="shortInput updateIDpatch" placeholder="Pet ID">
    <button id="getPet" class="button special">Select</button>
    </div>

    <div class="deleteContent">
    <div class="areYouSure"> 
           </div>
    `;
}

export function petCard(
  name,
  age,
  breed,
  kind,
  vax_status,
  good_w_kids,
  good_w_animals,
  about_pet,
  id,
  count
) {
  if (good_w_animals === true) {
    good_w_animals = "Good with Animals";
  } else {
    good_w_animals = "Best with no Animals";
  }
  if (good_w_kids === true) {
    good_w_kids = "Good with kids";
  } else {
    good_w_kids = "Best without kids";
  }
  if (vax_status === true) {
    vax_status = "Up to Date";
  } else {
    vax_status = "Not Current";
  }
  return `
  
    <div class="petBox ${count}">
      <div class="petBoxTop">
        <img class="petPic"src="./images/${kind}.png" alt="cat">
          <div>
            <div class="namePet" >${name}</div>
            <div class="agePet data">${age}</div>
            <div class="breedPet data">${breed}</div>
            <div class="kindPet data">${kind}</div>
            <div class="vaxPet data">${vax_status}</div>
            <div class="aniPet data">${good_w_animals}</div>
            <div class="kidPet data">${good_w_kids}</div>
          </div>
        </div>
    <hr>
  <div class="aboutPet hidden" >
    ${about_pet}
  </div>
    <p class="petIdCard">ID: ${id}</p>
  </div>

  `;
}
