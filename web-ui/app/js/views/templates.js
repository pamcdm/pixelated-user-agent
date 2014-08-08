/*global Handlebars */

define(['hbs/templates'], function (templates) {
  'use strict';

  var Templates = {
    compose: {
      box: window.Pixelated['app/templates/compose/compose_box.hbs'],
      inlineBox: window.Pixelated['app/templates/compose/inline_box.hbs'],
      replySection: window.Pixelated['app/templates/compose/reply_section.hbs'],
      recipientInput: window.Pixelated['app/templates/compose/recipient_input.hbs'],
      fixedRecipient: window.Pixelated['app/templates/compose/fixed_recipient.hbs'],
      recipients: window.Pixelated['app/templates/compose/recipients.hbs']
    },
    tags: {
      tagList: window.Pixelated['app/templates/tags/tag_list.hbs'],
      tag: window.Pixelated['app/templates/tags/tag.hbs'],
      tagInner: window.Pixelated['app/templates/tags/tag_inner.hbs'],
      shortcut: window.Pixelated['app/templates/tags/shortcut.hbs']
    },
    userAlerts: {
      message: window.Pixelated['app/templates/user_alerts/message.hbs']
    },
    mails: {
      single: window.Pixelated['app/templates/mails/single.hbs'],
      fullView: window.Pixelated['app/templates/mails/full_view.hbs'],
      mailActions: window.Pixelated['app/templates/mails/mail_actions.hbs'],
      sent: window.Pixelated['app/templates/mails/sent.hbs']
    },
    mailActions: {
      actionsBox: window.Pixelated['app/templates/mail_actions/actions_box.hbs'],
      composeTrigger: window.Pixelated['app/templates/mail_actions/compose_trigger.hbs'],
      refreshTrigger: window.Pixelated['app/templates/mail_actions/refresh_trigger.hbs'],
      paginationTrigger: window.Pixelated['app/templates/mail_actions/pagination_trigger.hbs']
    },
    noMessageSelected: window.Pixelated['app/templates/no_message_selected.hbs'],
    search: {
      trigger: window.Pixelated['app/templates/search/search_trigger.hbs']
    }
  };

  Handlebars.registerPartial('tag_inner', Templates.tags.tagInner);
  Handlebars.registerPartial('recipients', Templates.compose.recipients);

  return Templates;
});
