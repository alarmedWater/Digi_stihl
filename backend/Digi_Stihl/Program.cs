using Digi_Stihl.Data;
using Digi_Stihl.Repositories; 
using Digi_Stihl.Services;
using Digi_Stihl.MappingProfiles;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ─── 1) SERVICE REGISTRATION (before Build) ────────────────────────────────────

// Datenbankkontext registrieren
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Controller & Swagger/OpenAPI
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS (wichtig, bevor Build)
builder.Services.AddCors(opts =>
  opts.AddDefaultPolicy(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyHeader()
          .AllowAnyMethod()
));

// Repositories & Services
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

var app = builder.Build();

// ─── 2) MIDDLEWARE PIPELINE (after Build) ──────────────────────────────────────

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS **before** any endpoints are mapped
app.UseCors();

app.UseAuthorization();

// Controller-Endpunkte aktivieren
app.MapControllers();

app.Run();
