function draw_table()
{
	$("#results").empty();
	$.getJSONuncached = function (url)
	{
		return $.ajax(
		{
			url: url,
			type: 'GET',
			cache: false,
			success: function (html)
			{
				$("#results").append(html);
				select_row();
			}
		});
	};
	$.getJSONuncached("/get/html")
};

function select_row()
{
	$("#productsTable tbody tr[id]").click(function ()
	{
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		var section = $(this).prevAll("tr").children("td[colspan='5']").length - 1;
        var entree = $(this).attr("id") - 1;
       // document.getElementById("secUpdate").value = result.products.section[obj.section].name;
        //document.getElementById("itemUpdate").value = result.products.section[obj.section].entree[obj.entree].item;
        delete_row(section, entree);
        //trying to set the fields of the update form with the values of the object selected.
        
        //it didnt work, it keeps telling me document not defined. But it should work because document is a global
        //object created when the html page is loaded
	})
};

function delete_row(sec, ent)
{
	$("#delete").click(function ()
	{
		$.ajax(
		{
			url: "/post/delete",
			type: "POST",
			data:
			{
				section: sec,
				entree: ent
			},
			cache: false,
			success: setTimeout(draw_table, 1000)
		})
	})
};



$(document).ready(function ()
{
	draw_table();
});