using Digi_Stihl.Data;
using Digi_Stihl.Repositories; 
using Digi_Stihl.Services;
using Digi_Stihl.Mappings;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Datenbankkontext registrieren
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Controller und API-Explorer registrieren
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Repositories registrieren
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

// Services:
builder.Services.AddScoped<IEmployeeService, EmployeeService>();


// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));


var app = builder.Build();

// Middleware für Entwicklungsumgebung
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HTTPS-Umleitung und Autorisierung aktivieren
app.UseHttpsRedirection();
app.UseAuthorization();

// Controller-Endpunkte aktivieren
app.MapControllers();

app.Run();
