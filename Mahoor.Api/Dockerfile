#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Mahoor.Api/Mahoor.Api.csproj", "Mahoor.Api/"]
RUN dotnet restore "Mahoor.Api/Mahoor.Api.csproj"
COPY . .
WORKDIR "/src/Mahoor.Api"
RUN dotnet build "Mahoor.Api.csproj" -c Debug -o /app/build

FROM build AS publish
RUN dotnet publish "Mahoor.Api.csproj" -c Debug -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Mahoor.Api.dll"]