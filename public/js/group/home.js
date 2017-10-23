$(document).ready(function(){

	$('form.favorite').on('submit', function(e){
		e.preventDefault();
		
		var id = $(this).find('input#id').val();
		var clubName = $(this).find('input#club_Name').val();

		$.ajax({
			url: '/home',
			type: 'POST',
			data: {
				id: id,
				clubName: clubName
			},
			success: function(){
				console.log(clubName);
			}
		});
		
	});
})