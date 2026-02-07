using FluentValidation;
using SimpleTaskManager.Application.Contracts.Task;

namespace SimpleTaskManager.Application.Features.Task;

public class CreateCommandValidator : AbstractValidator<CreateCommand>
{
    public CreateCommandValidator()
    {
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.Priority).IsInEnum();
        RuleFor(x => x.Status).IsInEnum();
        RuleFor(x => x.Id).NotEmpty();
    }
}