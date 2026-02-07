using FluentValidation;
using SimpleTaskManager.Application.Contracts.Task;

namespace SimpleTaskManager.Application.Features.Task;

public class UpdateCommandValidator : AbstractValidator<UpdateCommand>
{
    public UpdateCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Title).NotEmpty().When(x => x.Title != null);
        RuleFor(x => x.Description).NotEmpty().When(x => x.Description != null);
        RuleFor(x => x.Priority).IsInEnum().When(x => x.Priority != null);
        RuleFor(x => x.Status).IsInEnum().When(x => x.Status != null);
    }
}