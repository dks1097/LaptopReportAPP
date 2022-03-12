using LaptopReport.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace LaptopReport.Controllers
{
    public class UserReportController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"select UserID,LaptopType,Issue,Notes,SerialNumber,convert(varchar(10),DateOfReport,120)Data,Nome,Email,Picture from dbo.UserReport";

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["LapTopReportAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(UserReport userReport)
        {
            try
            {
                string query = @"
                    insert into dbo.UserReport values
                    (
                    '" + userReport.LaptopType + @"'
                    ,'" + userReport.Issue + @"'
                    ,'" + userReport.Notes + @"'
                    ,'" + userReport.SerialNumber + @"'
                    ,'" + userReport.DateOfReport + @"'
                    ,'" + userReport.Nome + @"'
                    ,'" + userReport.Email + @"'
                    ,'" + userReport.Picture + @"'
                    )
                    ";

                DataTable table = new DataTable();
                using(var con=new SqlConnection(ConfigurationManager.
                    ConnectionStrings["LapTopReportAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Succefully!";
            }
            catch (Exception)
            {

                return "Failed to Add!";
            }
        }

        public string Put(UserReport userReport)
        {
            try
            {
                string query = @"
                    update dbo.UserReport set
                    (
                    LaptopType='" + userReport.LaptopType + @"'
                    Issue=,'" + userReport.Issue + @"'
                    Notes=,'" + userReport.Notes + @"'
                    SerialNumber=,'" + userReport.SerialNumber + @"'
                    DateOfReport=,'" + userReport.DateOfReport + @"'
                    Nome=,'" + userReport.Nome + @"'
                    Email=,'" + userReport.Email + @"'
                    Picture=,'" + userReport.Picture + @"'
                    where UserID="+userReport.UserID+@"
                    )
                    ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["LapTopReportAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Updated Succefully!";
            }
            catch (Exception)
            {

                return "Failed to Update!";
            }

        }
        public string Delete(int id)
        {
            try
            {
                string query = @"
                    delete from dbo.UserReport where UserID=" + id + @"";
                    
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["LapTopReportAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Deleted Succefully!";
            }
            catch (Exception)
            {

                return "Failed to Delete!";
            }

        }

        [Route("api/UserReport/SavePicture")]
        public string SavePicture()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedPicture = httpRequest.Files[0];
                string picturename = postedPicture.FileName;
                var endereço = HttpContext.Current.Server.MapPath ("~/Pictures/"+ picturename);

                postedPicture.SaveAs(endereço);

                return picturename;
            }
            catch (Exception)
            {

                return "other.png";
            }
        }

        [Route ("api/UserReport/GetAllLaptopType")]
        [HttpGet]
        public HttpResponseMessage GetAllLaptopType()
        {
            string query = @"select LaptopType from dbo.UserReport";

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["LapTopReportAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("api/UserReport/GetAllIssue")]
        [HttpGet]
        public HttpResponseMessage GetAllIssue()
        {
            string query = @"select Issue from dbo.UserReport";

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["LapTopReportAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("api/UserReport/GetAllDateOfReport")]
        [HttpGet]
        public HttpResponseMessage GetAllDateOfReport()
        {
            string query = @"select convert(varchar(10),DateOfReport,120) from dbo.UserReport";

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["LapTopReportAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
    }
}
