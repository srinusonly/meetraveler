MailingList = new Mongo.Collection("MailingList");

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to meetraveler.";
  };

  Template.mailing_list.events({
    'submit .mail-form': function (event, template) {

      mail = event.target.mailAddress.value
      Meteor.call("addMailToMailingList", mail)

      event.target.mailAddress.value = "";
      return false;
    }
  })

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

Meteor.methods({
  addMailToMailingList : function (mail) {
    // console.log("addMailToMailingList method is called..")
    MailingList.insert({
      mail_id : mail,
      createdAt : new Date()
    })
    // console.log("mail is successfully inserted..")
  }
})



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });
}
