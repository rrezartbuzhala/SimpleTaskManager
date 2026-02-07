using FluentValidation;
using SimpleTaskManager.Application.Contracts.Task;

namespace SimpleTaskManager.Application.Features.Task;

public class GetQueryValidator : AbstractValidator<GetQuery>
{
    public GetQueryValidator()
    {
        RuleFor(x => x.Status).IsInEnum().When(x => x.Status != null);
    }
}