(function injectT4ToolbarIcons() {
  /*                name
                    link
                    font awesome icon
                    label
                    tooltip
  */
  const buttonDefinitions = {
    media:        [
      '/terminalfour/page/media',
      'media-library',
      'fa fa-image',
      'Media Library',
      'Go to the Media Library'],
    mediaconfig:  [
      '/terminalfour/page/mediaconfig#types',
      'mediaconfig',
      'fa fa-sliders',
      'Media Configuration',
      'Go to the Media Configuration'],
    user:         [
      '/terminalfour/page/user',
      'user-management',
      'fa fa-user',
      'User Management',
      'Go to User Management'],
    group:        [
      '/terminalfour/page/group',
      'group-management',
      'fa fa-users',
      'Group Management',
      'Go to Group Management'],
    contenttypeusage: [
      '/terminalfour/page/contenttypeusage',
      'content-type-usage',
      'fa fa-puzzle-piece',
      'Content Type Usage',
      'View Content Type Usage'],
    clearcache: [
      '/terminalfour/SiteManager?ctfn=cache',
      'clear-cache',
      'fa fa-rotate-right',
      'Clear the Cache',
      'Clear the site cache'],
  };


  chrome.storage.sync.get(['t4toolbar'], (data) => {
    const settings = data.t4toolbar || {};

    const buttonsToInject = Object.entries(buttonDefinitions)
      .filter(([key]) => settings[key] !== false) // default to true
      .map(([, value]) => value);

    if (buttonsToInject.length === 0) {
      console.log("⚠️ No toolbar buttons enabled.");
      return;
    }

    const tryInject = () => {
      const siteStructureLink = document.querySelector('a#site-structure');
      if (!siteStructureLink) {
        requestAnimationFrame(tryInject);
        return;
      }

      const siteStructureLI = siteStructureLink.closest('li');
      if (!siteStructureLI || siteStructureLI.nextElementSibling?.classList.contains('js-sta-inject')) {
        return;
      }

      [...buttonsToInject].reverse().forEach(([href, id, iconClass, title, aria]) => {
        const li = document.createElement('li');
        li.classList.add('js-sta-inject');

        const a = document.createElement('a');
        a.href = href;
        a.id = id;
        a.className = 'ace-tooltip';
        a.setAttribute('title', title);
        a.setAttribute('aria-label', aria);

        const icon = document.createElement('i');
        icon.className = `ace-icon ${iconClass}`;

        a.appendChild(icon);
        li.appendChild(a);
        siteStructureLI.parentNode.insertBefore(li, siteStructureLI.nextSibling);
      });

      console.log("✅ Toolbar icons injected based on user settings.");
    };

    tryInject();
  });
})();
