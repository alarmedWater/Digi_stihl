using Digi_Stihl.Data;
using Digi_Stihl.Repositories;
using Digi_Stihl.Services;
using Digi_Stihl.MappingProfiles;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// ─── 1) SERVICE REGISTRATION ────────────────────────────────────

// Database context (SQL Server / Docker)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Controllers & Swagger/OpenAPI
builder.Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        // Enums als Strings serialisieren
        opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ─── CORS: Erlaube nur Angular-Dev-Server ────────────────────────
builder.Services.AddCors(opts =>
{
    opts.AddPolicy("DevCors", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod()
    );
});

// Repositories & Services
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<ICapacityRepository, CapacityRepository>();
builder.Services.AddScoped<ICapacityService, CapacityService>();
builder.Services.AddScoped<IExitReasonRepository, ExitReasonRepository>();


// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

var app = builder.Build();

// ─── 2) MIDDLEWARE PIPELINE ──────────────────────────────────────

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HTTPS-Redirect, dann CORS, dann Auth/Zugriff, dann Controller-Routing
app.UseHttpsRedirection();

// Aktiviere unsere benannte CORS-Policy
app.UseCors("DevCors");

app.UseAuthorization();

app.MapControllers();

app.Run();
