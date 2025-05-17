using Microsoft.Extensions.Caching.Memory;
using Tasks.Api.Models.DTOs;
using Tasks.Api.Services.Interfaces;

namespace Tasks.Api.Services.Implementations
{
    public class TaskService : ITaskService
    {
        private readonly IMemoryCache _cache;
        private readonly string CACHE_KEY = "tasks";
        private int _nextId = 1;

        public TaskService(IMemoryCache cache)
        {
            _cache = cache;

            if (!_cache.TryGetValue(CACHE_KEY, out List<Models.Domain.Task> _))
            {
                var initialTasks = new List<Models.Domain.Task>
                {
                    new Models.Domain.Task
                    {
                        Id = _nextId++,
                        Title = "Estudar ASP.NET Core",
                        Description = "Eu gostaria de fazer sessões de 30 minutos com timers em lofi pomodoro todos os dias",
                        IsCompleted = false,
                        CreatedAt = DateTime.Now
                    },
                    new Models.Domain.Task
                    {
                        Id = _nextId++,
                        Title = "Praticar Angular",
                        Description = "Desenvolver uma aplicação totalmente em angular, de forma responsiva, e mobile first",
                        IsCompleted = false,
                        CreatedAt = DateTime.Now
                    }
                };

                _cache.Set(CACHE_KEY, initialTasks, TimeSpan.FromDays(1));
            }
        }

        public async Task<IEnumerable<TaskDto>> GetAllTasksAsync()
        {
            if (_cache.TryGetValue(CACHE_KEY, out List<Models.Domain.Task> tasks))
            {
                return tasks.Select(MapToDto);
            }

            return Enumerable.Empty<TaskDto>();
        }

        public async Task<TaskDto?> GetTaskByIdAsync(int id)
        {
            if (_cache.TryGetValue(CACHE_KEY, out List<Models.Domain.Task> tasks))
            {
                var task = tasks.FirstOrDefault(t => t.Id == id);
                return task != null ? MapToDto(task) : null;
            }

            return null;
        }

        public async Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto)
        {
            var tasks = _cache.GetOrCreate(CACHE_KEY, entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1);
                return new List<Models.Domain.Task>();
            });

            var newTask = new Models.Domain.Task
            {
                Id = _nextId++,
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                IsCompleted = false,
                CreatedAt = DateTime.Now
            };

            tasks.Add(newTask);
            _cache.Set(CACHE_KEY, tasks, TimeSpan.FromDays(1));

            return MapToDto(newTask);
        }

        public async Task<TaskDto?> UpdateTaskAsync(int id, UpdateTaskDto updateTaskDto)
        {
            if (_cache.TryGetValue(CACHE_KEY, out List<Models.Domain.Task> tasks))
            {
                var taskToUpdate = tasks.FirstOrDefault(t => t.Id == id);

                if (taskToUpdate == null)
                    return null;

                taskToUpdate.Title = updateTaskDto.Title;
                taskToUpdate.Description = updateTaskDto.Description;
                taskToUpdate.IsCompleted = updateTaskDto.IsCompleted;
                taskToUpdate.UpdatedAt = DateTime.Now;

                _cache.Set(CACHE_KEY, tasks, TimeSpan.FromDays(1));

                return MapToDto(taskToUpdate);
            }

            return null;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            if (_cache.TryGetValue(CACHE_KEY, out List<Models.Domain.Task> tasks))
            {
                var taskToRemove = tasks.FirstOrDefault(t => t.Id == id);

                if (taskToRemove == null)
                    return false;

                tasks.Remove(taskToRemove);
                _cache.Set(CACHE_KEY, tasks, TimeSpan.FromDays(1));

                return true;
            }

            return false;
        }

        private TaskDto MapToDto(Models.Domain.Task task)
        {
            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt
            };
        }
    }
}
