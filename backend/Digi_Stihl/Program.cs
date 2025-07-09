using Digi_Stihl.Data;
using Digi_Stihl.Repositories;
using Digi_Stihl.Services;
using Digi_Stihl.MappingProfiles;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// ─── 1) SERVICE REGISTRATION ────────────────────────────────────

// #1: DbContext
builder.Services.AddDbContext<ApplicationDbContext>(opts =>
    opts.UseSqlServer(
      builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// #2: Controllers + JSON-Enums
builder.Services.AddControllers()
    .AddJsonOptions(o =>
        o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter())
    );
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// #3: CORS – hier komplett auf „AllowAny…“ für Development
builder.Services.AddCors(o =>
    o.AddPolicy("DevCors", p =>
        p.AllowAnyOrigin()
         .AllowAnyMethod()
         .AllowAnyHeader()
    )
);

// #4: DI für Repository & Service Layer
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeService,    EmployeeService>();
builder.Services.AddScoped<ICapacityRepository, CapacityRepository>();
builder.Services.AddScoped<ICapacityService,    CapacityService>();
builder.Services.AddScoped<IExitReasonRepository, ExitReasonRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();


// #5: AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

var app = builder.Build();

// ─── 2) MIDDLEWARE PIPELINE ──────────────────────────────────────

// Swagger nur in Dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Digi_Stihl API V1");
    });
}

// **kein** HTTPS-Redirect (wir arbeiten HTTP-only im Dev)
// app.UseHttpsRedirection();

// CORS muss vor Authorization
app.UseCors("DevCors");

app.UseAuthorization();
app.MapControllers();

app.Run();
