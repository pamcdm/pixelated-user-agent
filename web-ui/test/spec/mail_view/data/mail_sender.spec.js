describeComponent('mail_view/data/mail_sender', function () {
  'use strict';

  var mailBuilder;
  var mail;

  beforeEach(function () {
    mailBuilder =  require('mail_view/data/mail_builder');
    mail = Pixelated.testData().parsedMail.simpleTextPlain;
    this.setupComponent();
  });

  it('sends mail data with a POST to the server when asked to send email', function() {
    var mailSentEventSpy = spyOnEvent(document, Pixelated.events.mail.sent);
    var deferred = $.Deferred();

    spyOn($, 'ajax').and.returnValue(deferred);

    this.component.trigger(Pixelated.events.mail.send, mail);

    deferred.resolve();

    expect(mailSentEventSpy).toHaveBeenTriggeredOn(document);

    expect($.ajax.calls.mostRecent().args[0]).toEqual('/mails');
    expect($.ajax.calls.mostRecent().args[1].type).toEqual('POST');
    expect(JSON.parse($.ajax.calls.mostRecent().args[1].data).header).toEqual(mail.header);
    expect(JSON.parse($.ajax.calls.mostRecent().args[1].data).body).toEqual(mail.body);
  });

  it('save draft data with a PUT to the server', function() {
    var draftSavedEventSpy = spyOnEvent(document, Pixelated.events.mail.draftSaved);
    var deferred = $.Deferred();

    spyOn($, 'ajax').and.returnValue(deferred);

    mail.ident = 0;
    this.component.trigger(Pixelated.events.mail.saveDraft, mail);

    deferred.resolve();

    expect(draftSavedEventSpy).toHaveBeenTriggeredOn(document);

    expect($.ajax.calls.mostRecent().args[0]).toEqual('/mails');
    expect($.ajax.calls.mostRecent().args[1].type).toEqual('PUT');
    expect(JSON.parse($.ajax.calls.mostRecent().args[1].data).header).toEqual(mail.header);
    expect(JSON.parse($.ajax.calls.mostRecent().args[1].data).body).toEqual(mail.body);
  });

  it('displays generic error message when sending an email fails in the service', function () {
    var deferred;
    deferred = $.Deferred();
    deferred.reject({responseJSON: {}}, 500, 'Internal Server Error');

    var messageEvent = spyOnEvent(document, Pixelated.events.ui.userAlerts.displayMessage);
    spyOn($, 'ajax').and.returnValue(deferred);

    this.component.trigger(Pixelated.events.mail.send, mail);

    expect(messageEvent).toHaveBeenTriggeredOnAndWith(document, {message: 'Ops! something went wrong, try again later.'});
  });

  it('displays error message returned by the service when sending an email fails in the service', function () {
    var deferred;
    deferred = $.Deferred();
    deferred.reject({responseJSON: {message: 'test: error message'}}, 422, 'Unprocessable Entity');

    var messageEvent = spyOnEvent(document, Pixelated.events.ui.userAlerts.displayMessage);
    spyOn($, 'ajax').and.returnValue(deferred);

    this.component.trigger(Pixelated.events.mail.send, mail);

    expect(messageEvent).toHaveBeenTriggeredOnAndWith(document, {message: 'Error sending mail: test: error message'});
  });
});
