Session.setDefault("headerName","Micha")
  
Template.header.name = function(){
  return Session.get("headerName")
}

Template.einkaufsliste.produkte = function(){
  produkte = Produkte.find({}).fetch();
  for(var i = 0; i < produkte.length; i++) {
    produkte[i].index = i+1;
  }
  return produkte;
}

Template.addItem.events({
  'click #addButton': function (event) {
    event.preventDefault();
    var name = document.getElementById("itemName");
    var menge = document.getElementById("itemMenge");
    if (name.value.length > 3 && menge.value.length >0) {
      Produkte.insert({"name":name.value, "menge":menge.value,"checked":false});
      name.value = "";
      menge.value = "";
    };
  }
});
Template.produkt.events({
  'click .button-error': function (e,t) {
    e.preventDefault();
    Produkte.update(t.data._id,{$set:{checked:true}});
  },
  'click .button-success': function (e,t) {
    e.preventDefault();
    Produkte.update(t.data._id,{$set:{checked:false}});
  },
  'click .button-remove': function (e,t) {
    e.preventDefault();
    Produkte.remove(t.data._id);
  }
});