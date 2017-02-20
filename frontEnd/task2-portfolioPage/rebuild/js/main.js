;( (window, document, undefined) => {
	

	let navBars = $("#nav-bars"),
		nav = $("#nav"),
		archArr = nav.find("a"),
		header = $('.header'),
		heightArr,
		scrollTimer;
		

	// method for update tags height when change window size
	let updateHeight = _ => {
		let headerHeight = header.height();
		heightArr = ['contactTag', 'portfolioTag' , 'topTag'].map((v, i) => ($(`#${v}`).position().top|0) - (i<2?headerHeight:0));		
    }
    updateHeight();

    // toggle navbar at small device, as phone, ipad.	
	navBars.click(_ => {
		nav.fadeToggle()
		console.log(nav);
	});

	// move to the tag position
	nav.click( e => {

	    let target = e.target,
	    	curHeight,
	    	tarHeight;

	    if(target.nodeName.toLowerCase() == "a"){
	      // if the timer already exist, clear it.
	  	  if(scrollTimer) window.clearTimeout(scrollTimer);  	
	  	  // get the height of archer
	      tarHeight = heightArr[2-archArr.index(target)];

	      scrollTimer = setInterval(_ => {
	      	curHeight = $(window).scrollTop();
	      	if(curHeight === tarHeight) clearTimeout(scrollTimer);
	      	else if(tarHeight > curHeight) $(window).scrollTop(curHeight + Math.ceil((tarHeight - curHeight) / 10));
	        else $(window).scrollTop(curHeight - Math.ceil((curHeight - tarHeight) / 10));
	      }, 30);
	    }
	    return false;
	});
	
	
	$(window).on('scroll', e => {

		const changeActive = i => {
			archArr.removeClass('active');
		    archArr.eq(i).addClass('active');
		    return true;
		}

		let scrollTop = $(window).scrollTop();

		heightArr.some((v, i) => scrollTop >= v && changeActive(2-i));

	});
	

	$(window).on('resize', v => updateHeight());


})(window, document);