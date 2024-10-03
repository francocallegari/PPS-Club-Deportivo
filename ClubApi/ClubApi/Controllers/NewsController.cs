using Application.Interfaces;
using Application.Models;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet("News")]
        public ActionResult<ICollection<NewsDto>> GetAllNews()
        {
            try
            {
                return Ok(_newsService.GetAllNews());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<NewsDto> CreateNews([FromBody] NewsDto newsDto)
        {
            try
            {
                var existingNews = _newsService.GetNewsByTitle(newsDto.Title);

                if (existingNews != null)
                    return BadRequest("La noticia ya existe.");

                //crear una nueva noticia
                var createdNews = _newsService.CreateNews(new News
                {
                    Title = newsDto.Title,
                    Description = newsDto.Description,
                    ImageUrl = newsDto.ImageUrl,
                    PublicationDate = newsDto.PublicationDate
                });

                return Ok(NewsDto.Create(createdNews));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateNews([FromRoute] int id, [FromBody] NewsDto newsDto)
        {
            try
            {
                _newsService.UpDateNews(id, newsDto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteNews([FromRoute] int id)
        {
            try
            {
                _newsService.DeleteNews(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ha ocurrido un error inesperado. Error: " + ex.Message);
            }
        }
    }
}
