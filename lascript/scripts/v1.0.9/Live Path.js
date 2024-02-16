app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
app.executeMenuCommand('Make Planet X');
app.executeMenuCommand('Expand Planet X');
selection[0].groupItems[selection[0].groupItems.length - 1].remove();
selection.ungroupAll();