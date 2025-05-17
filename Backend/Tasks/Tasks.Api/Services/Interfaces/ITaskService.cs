using Tasks.Api.Models.DTOs;

namespace Tasks.Api.Services.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetAllTasksAsync();

        Task<TaskDto?> GetTaskByIdAsync(int id);

        Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto);

        Task<TaskDto?> UpdateTaskAsync(int id, UpdateTaskDto updateTaskDto);

        Task<bool> DeleteTaskAsync(int id);
    }
}
