﻿using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Smurfs.Entities.Conrete;
using Smurfs.WebUI.Services.Interfaces;

namespace WebUI.Controllers
{
    public class ProjectController : Controller
    {
        private IProjectService _projectService { get; set; }
        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }
        public IActionResult Project()
        {
            return View();
        }

        public async Task<IActionResult> GetProjectsFromAPI()
        {
            var projects = new List<Project>();

            using (var httpclient = new HttpClient())
            {
                using (var response = await httpclient.GetAsync("https://smuhammetulas.com/api/Project"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    projects = JsonConvert.DeserializeObject<List<Project>>(apiResponse);
                }
            }
            return View("Project",projects);
        }
    }
}
