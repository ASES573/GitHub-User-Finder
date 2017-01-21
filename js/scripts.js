$(document).ready(function(){
$("#searchUser").on('keyup',function(e){
let username=e.target.value;
$.ajax({
url:'https://api.github.com/users/'+username,
data:
{
client_id:"ab91b905f85e14dac255",
client_secret:"329f81b45c5e9a16a37f14d44ed2a6cea3fadd9a"
}
}).done(function(user){
	$.ajax({
     url:'https://api.github.com/users/'+username+'/repos',
     data:
{
client_id:"ab91b905f85e14dac255",
client_secret:"329f81b45c5e9a16a37f14d44ed2a6cea3fadd9a"
}
	}).done(function(repos){
		$.each(repos,function(index,repo){
			$("#repos").append(`
				<div class="well">
				<div class="row">
				<div class="col-md-7">
				<strong>${repo.name}</strong>
				</div>
				<div class="col-md-3">
				<span class="label label-default">Forks: ${repo.forks_count}</span>
                  <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="label label-success">Stars: ${repo.stargazers_count}</span>
					</div>
					<div class="col-md-2">
					<a  class="btn btn-info btn-block" href="${repo.html_url}" target="_blank">Repository</a>
					</div>
				</div>
				</div>
				`);
		});

	});
$('#profile').html(`
<div class="panel panel-default">
   <div class="panel-heading">
      <h3 class="panel-title">${user.name}</h3>
   </div>
   <div class="panel-body">
      <div class="row">
         <div class="col-md-3">
            <img class="thumbnail avatar img-responsive" src="${user.avatar_url}"/>
            <a class="btn btn-success btn-block" target="_blank" href="${user.html_url}">View Profile</a>
         </div>
         <div class="col-md-9">
           <span class="label label-default">Public Repos: ${user.public_repos}</span>
              <span class="label label-primary">Public Gists: ${user.public_gists}</span>
              <span class="label label-success">Followers: ${user.followers}</span>
              <span class="label label-info">Following: ${user.following}</span>
            <br>
            <br>
            <ul class="list-group">
               <li class="list-group-item">Company: ${user.company}</li>
               <li class="list-group-item">Website/Blog: ${user.blog}</li>
               <li class="list-group-item">Location: ${user.location}</li>
               <li class="list-group-item">Member  Since: ${user.created_at}</li>
            </ul>
         </div>
      </div>
   </div>
</div>
<h3 class"page-header">Latest Repos</h3>
<div id="repos"></div>
`);
});
});
});