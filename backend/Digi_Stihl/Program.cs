using Digi_Stihl.Data;
using Digi_Stihl.Repositories;
using Digi_Stihl.Services;
using Digi_Stihl.MappingProfiles;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// ─── Service Registration ───────────────────────────────────────

// Add DbContext to the container.
builder.Services.AddDbContext<ApplicationDbContext>(opts =>
    opts.UseSqlServer(
      builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(o =>
        o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter())
    );
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy for development.
builder.Services.AddCors(o =>
    o.AddPolicy("DevCors", p =>
        p.AllowAnyOrigin()
         .AllowAnyMethod()
         .AllowAnyHeader()
    )
);

// Dependency Injection for Repository & Service Layer
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeService,    EmployeeService>();
builder.Services.AddScoped<ICapacityRepository, CapacityRepository>();
builder.Services.AddScoped<ICapacityService,    CapacityService>();
builder.Services.AddScoped<IExitReasonRepository, ExitReasonRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();


// Configure AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

var app = builder.Build();

// ─── Middleware Pipeline ────────────────────────────────────────

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Digi_Stihl API V1");
    });
}

// We are not using HTTPS redirection in development.
// app.UseHttpsRedirection();

// CORS must be configured before Authorization.
app.UseCors("DevCors");

app.UseAuthorization();
app.MapControllers();

app.Run();
