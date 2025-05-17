using Microsoft.AspNetCore.Mvc;
using Tasks.Api.Models.DTOs;
using Tasks.Api.Services.Interfaces;

namespace Tasks.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly ILogger<TasksController> _logger;

        public TasksController(ITaskService taskService, ILogger<TasksController> logger)
        {
            _taskService = taskService;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
        {
            var tasks = await _taskService.GetAllTasksAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TaskDto>> GetTask(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);

            if (task == null)
                return NotFound($"Tarefa com ID {id} não encontrada");

            return Ok(task);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TaskDto>> CreateTask(CreateTaskDto createTaskDto)
        {
            if (string.IsNullOrWhiteSpace(createTaskDto.Title))
                return BadRequest("O título da tarefa é obrigatório");

            var createdTask = await _taskService.CreateTaskAsync(createTaskDto);

            return CreatedAtAction(
                nameof(GetTask),
                new { id = createdTask.Id },
                createdTask);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TaskDto>> UpdateTask(int id, UpdateTaskDto updateTaskDto)
        {
            if (string.IsNullOrWhiteSpace(updateTaskDto.Title))
                return BadRequest("O título da tarefa é obrigatório");

            var updatedTask = await _taskService.UpdateTaskAsync(id, updateTaskDto);

            if (updatedTask == null)
                return NotFound($"Tarefa com ID {id} não encontrada");

            return Ok(updatedTask);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var result = await _taskService.DeleteTaskAsync(id);

            if (!result)
                return NotFound($"Tarefa com ID {id} não encontrada");

            return NoContent();
        }
    }
}
